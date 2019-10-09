import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckboxTree from 'react-checkbox-tree';
import forEach from 'lodash.foreach';

import { MODALITIES, DATA_TYPES } from '../../constants';

import rtDataActions from '../../store/rt_data/actions';
import { makeGetStructuresData } from '../../store/rt_data/reducers';

import toolsStateActions from '../../store/tools_state/actions';

import NodeEntry from './NodeEntry';
import NodeEntryDragSource from './NodeEntryDragSource';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './RTTreeViewer.css';

const TreeIcon = ({ icon, color, useTextShadow }) => {
  let _color = color;
  if (color && Array.isArray(color)) {
    _color = color.join(',');
    if (color.length === 3) _color = `rgb(${_color})`;
    else _color = `rgba(${_color})`;
  }

  const style = {
    color: _color || '',
    textShadow: useTextShadow ? '0 0 3px #fff' : '',
  };

  return <span className={`rct-icon fas ${icon}`} style={style} />;
};

const getDisabledIcon = disabled => {
  if (disabled) return <TreeIcon icon="fa-times" color="#dc3545" />;
  else return <TreeIcon icon="fa-check" color="#28a745" />;
};

const VALUE2TYPE = {
  structures: DATA_TYPES.CONTORNO,
  structure: DATA_TYPES.CONTORNO,
  beam_lines: DATA_TYPES.BEAM_LINES,
  doses: DATA_TYPES.DOSE,
};

// https://github.com/jakezatecky/react-checkbox-tree
// https://github.com/react-component/tree
class RTTreeViewer extends Component {
  state = {
    tree: null,

    checked: [],
    expanded: [],
  };

  icons = {
    parentClose: <span className="rct-icon fa-folder" />,
    parentOpen: <span className="rct-icon fa-folder-open" />,
    leaf: <span className="rct-icon fa-file" />,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    if (this.shouldFetchStructuresData()) this.fetchStructuresData();

    this.generateTree();
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.structures !== this.props.structures &&
      Object.keys(this.props.structures).length > 0
    ) {
      this.generateTree();
    } else if (prevProps.studies !== this.props.studies) {
      if (this.shouldFetchStructuresData()) this.fetchStructuresData();
      this.generateTree();
    }
  };

  getAvailableModalities = displaySets => {
    const ret = {};
    forEach(displaySets, ds => {
      let { modality } = ds;
      if (!modality) modality = 'UN';

      if (!ret[modality]) ret[modality] = [];
      ret[modality].push(ds);
    });
    return ret;
  };

  generateTree = () => {
    // https://www.dicomlibrary.com/dicom/modality/
    const { studies } = this.props;
    const { expanded } = this.state;

    const tree = [];
    forEach(studies, (study, i) => {
      const studyDescription = study.studyDescription || i + 1;
      const studyInstanceUid = study.studyInstanceUid;
      const modalities = this.getAvailableModalities(study.displaySets);

      let disabled;
      let displaySetInstanceUid;

      // Study
      const root = {
        value: `study-${i}`,
        label: <NodeEntry label={`Study: ${studyDescription}`} />,
        showCheckbox: false,
        studyInstanceUid,
        children: [],
      };
      if (i === 0 && expanded.length === 0) expanded.push(`study-${i}`);

      const nodesModalities = [
        'CT',       // Computed Tomography
        'SEG',      // Segmentation
        'RTIMAGE',  // RTIMAGE
        'MR',       // Magnetic Resonance
        'PT',       // Positron emission tomography (PET)
        'CR',       // Computed Radiography
        'SM',       // Slide Microscopy
        'SR',       // SR Document
        'KO',       // Key Object Selection
        'PR',       // Presentation State
      ];

      forEach(nodesModalities, modality => {
        if (modalities[modality] && modalities[modality].length > 0) {
          forEach(modalities[modality], (ds, j) => {
            const labelTxt = modality + ': ' + (ds.seriesDescription || j + 1);
            root.children.push({
              value: `${modality}-${i}-${j}`,
              label: (
                <NodeEntryDragSource
                  studyInstanceUid={studyInstanceUid}
                  displaySetInstanceUid={ds.displaySetInstanceUid}
                  label={labelTxt}
                />
              ),
              showCheckbox: false,
              icon: getDisabledIcon(false),
              studyInstanceUid,
            });
          });
        }
      });

      // RTPlan
      if (modalities['RTPLAN'] && modalities['RTPLAN'].length > 0) {
        displaySetInstanceUid = modalities['RTPLAN'][0].displaySetInstanceUid;
        root.children.push({
          value: `RTPLAN-${i}`,
          label: (
            <NodeEntryDragSource
              studyInstanceUid={studyInstanceUid}
              displaySetInstanceUid={displaySetInstanceUid}
              label="Ficha"
            />
          ),
          showCheckbox: false,
          icon: getDisabledIcon(disabled),
          studyInstanceUid,
        });
      }

      // DVH
      if(modalities['RTDOSE'] && modalities['RTSTRUCT']) {
        displaySetInstanceUid = modalities['RTDOSE'][0].displaySetInstanceUid;
        root.children.push({
          value: `DVH-${i}`,
          label: (
            <NodeEntryDragSource
              studyInstanceUid={studyInstanceUid}
              displaySetInstanceUid={displaySetInstanceUid}
              label="DVH"
            />
          ),
          showCheckbox: false,
          icon: getDisabledIcon(disabled),
          studyInstanceUid,
        });
      }

      // RTStruct
      if(modalities['CT'] && modalities['RTSTRUCT']) {
        const children = [];
        if (this.props.structures && this.props.structures[studyInstanceUid]) {
          const structures = this.props.structures[studyInstanceUid];
          forEach(structures, structure => {
            children.push({
              value: `structure-${i}-${structure.id}`,
              label: <NodeEntry label={structure.name} />,
              structure_id: structure.id,
              icon: (
                <TreeIcon icon="fa-heart" color={structure.color} useTextShadow />
              ),
            });
          });
        }
        root.children.push({
          value: `structures-${i}`,
          label: <NodeEntry label={'Structures'} />,
          studyInstanceUid,
          icon: getDisabledIcon(disabled),
          children,
        });
        // if(children.length > 0) expanded.push(`structures-${i}`);
      }

      // RTDose
      if(modalities['RTDOSE']) {
        root.children.push({
          value: `doses-${i}`,
          label: <NodeEntry label={'Dose'} />,
          icon: getDisabledIcon(disabled),
          studyInstanceUid,
        });
      }

      // Beam Lines
      if(modalities['CT'] && modalities['RTPLAN']) {
        root.children.push({
          value: `beam_lines-${i}`,
          label: <NodeEntry label={'Beam Lines'} />,
          icon: getDisabledIcon(disabled),
          studyInstanceUid,
        });
      }

      tree.push(root);
    });

    this.setState({
      tree,
      expanded,
    });
  };

  shouldFetchStructuresData = () => {
    const structuresLen = this.props.structures
      ? Object.keys(this.props.structures).length
      : 0;
    const studiesLen = this.props.studies ? this.props.studies.length : 0;
    return structuresLen === 0 && studiesLen > 0;
  };

  fetchStructuresData = () => {
    const { studies } = this.props;

    forEach(studies, (study, i) => {
      const studyInstanceUid = study.studyInstanceUid;

      let rtStructInstanceUid = '';
      forEach(study.displaySets, ds => {
        if (ds.modality.toUpperCase() === MODALITIES.RTSTRUCT)
          rtStructInstanceUid = ds.seriesInstanceUid;
      });

      return this.props
        .fetchStructuresData(studyInstanceUid, {
          studyInstanceUid,
          seriesInstanceUids: [rtStructInstanceUid],
        })
        .catch(this.onError);
    });
  };

  onError = err => {
    if (err.response) console.error(err.response.data);
    else console.error(err);
  };

  onCheck = (checked, node) => {
    const data = node.parent.children ? node.parent.children[node.index] : {};
    const parentRegex = /^(structures|beam_lines|doses)/i;
    const key = node.value.split('-');
    const data_type = VALUE2TYPE[key[0]];

    if (parentRegex.test(key[0])) {
      const children = {};
      if (key[0] === 'structures') {
        forEach(data.children, c => {
          children[c.structure_id] = node.checked;
        });
      }
      this.props.setToolData(data.studyInstanceUid, data_type, {
        active: node.checked,
        children,
      });
    } else if (key[0] === 'structure') {
      const children = {};
      let n = 0;
      forEach(node.parent.children, c => {
        const tmp = checked.includes(c.value);
        children[c.structure_id] = tmp;
        n += +tmp;
      });
      const active = n > 0;
      this.props.setToolData(node.parent.studyInstanceUid, data_type, {
        active,
        children,
      });
    }
    this.setState({ checked });
  };

  onExpand = expanded => this.setState({ expanded });

  render() {
    if (this.state.tree)
      return (
        <div className="RTTreeViewer">
          <CheckboxTree
            nodes={this.state.tree}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={this.onCheck}
            onExpand={this.onExpand}
            icons={this.icons}
          />
        </div>
      );
    else return null;
  }
}

const makeMapStateToProps = () => {
  const getStructuresData = makeGetStructuresData();
  return (state, ownProps) => {
    const { studies } = ownProps;
    const studyInstanceUids = studies
      ? studies.map(study => study.studyInstanceUid)
      : [];
    return {
      structures: getStructuresData(state, studyInstanceUids),
    };
  };
};

const ConnectedRTTreeViewer = connect(
  makeMapStateToProps,
  {
    fetchStructuresData: rtDataActions.fetchStructuresData,
    setToolData: toolsStateActions.setData,
  },
  null
)(RTTreeViewer);

export default ConnectedRTTreeViewer;
