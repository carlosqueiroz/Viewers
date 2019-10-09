import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import forEach from 'lodash.foreach';

import { MODALITIES } from '../../constants';

import rtDataActions from '../../store/rt_data/actions';
import { makeGetDvhGraphData } from '../../store/rt_data/reducers';

import Graph from './Graph';

import dvh_test from './dvh_test.json';
import './DvhViewer.css';

class DvhViewer extends Component {
  // Melhor usar cache local até implementar a parte de salvar os dados no BD do servidor,
  // se não vai lotar o server com arquivos em public/uploads/viewer ...
  USE_CACHE = false;

  constructor(props) {
    super(props);

    this.state = {
      dvhGraphData: null,
      dose_unit: null,
      vol_unit: null,
      error: null,
    };
  }

  componentDidMount() {
    let dvhGraphData = null;
    if (this.USE_CACHE) {
      const dvh_data = dvh_test;
      if (dvh_data['dvhData']) dvhGraphData = this.parseDvhData(dvh_data);
      else
        dvhGraphData = this.parseDvhData({
          'Fase 1': dvh_data,
        });
      console.log(
        'dvhGraphData (CACHE)',
        dvhGraphData,
        'time',
        new Date().getTime()
      );

      this.setState({
        dvhGraphData,
        error: null,
      });
    } else if (!this.props.dvh_data) this.fetchDvhGraphData();
    else if (this.props.dvh_data) {
      if (this.props.dvh_data['dvhData'])
        dvhGraphData = this.parseDvhData(this.props.dvh_data);
      else
        dvhGraphData = this.parseDvhData({
          'Fase 1': this.props.dvh_data,
        });
      console.log(
        'dvhGraphData (didMount)',
        dvhGraphData,
        'time',
        new Date().getTime()
      );

      this.setState({
        dvhGraphData,
        error: null,
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.dvh_data !== this.props.dvh_data && this.props.dvh_data) {
      let dvhGraphData = null;
      if (this.props.dvh_data['dvhData'])
        dvhGraphData = this.parseDvhData(this.props.dvh_data);
      else
        dvhGraphData = this.parseDvhData({
          'Fase 1': this.props.dvh_data,
        });
      console.log(
        'dvhGraphData (didUpdate)',
        dvhGraphData,
        'time',
        new Date().getTime()
      );

      this.setState({
        dvhGraphData,
        error: null,
      });
    }
  };

  onError = err => {
    if (err.response) console.error(err.response.data);
    else console.error(err);
    this.setState({
      error: 'Ocorreu um erro...',
    });
  };

  fetchDvhGraphData = () => {
    const { displaySet, studies } = this.props.viewportData;

    const { studyInstanceUid } = displaySet;
    let rtStructInstanceUid = '';
    let rtDoseInstanceUid = '';

    forEach(studies[0].seriesList, function(v, i) {
      if (v.modality.toUpperCase() === MODALITIES.RTSTRUCT) {
        rtStructInstanceUid = v.seriesInstanceUid;
      } else if (v.modality.toUpperCase() === MODALITIES.RTDOSE) {
        rtDoseInstanceUid = v.seriesInstanceUid;
      }
    });

    if (!rtStructInstanceUid || !rtDoseInstanceUid) {
      this.setState({
        dvhGraphData: null,
        error: 'Não foi possivel encontrar RtStruct ou RtDose...',
      });
      return;
    }

    return this.props
      .fetchDvhGraphData(studyInstanceUid, {
        studyInstanceUid,
        seriesInstanceUids: [rtStructInstanceUid, rtDoseInstanceUid],
      })
      .catch(this.onError);
  };

  parseData = data => {
    var ret = {
      options: {
        xlabel: 'Dose (cGy)',
        ylabel: 'Volume (%)',
        labels: ['Dose (cGy)'],
        legend: 'always',
        labelsKMB: true,
        highlightSeriesOpts: { strokeWidth: 1.1 },
        labelsDiv: 'legend',
        yRangePad: 0,
        axes: {},
        // legendFormatter: this.legendFormatter,
        // underlayCallback: this.updateGraph,
        series: {},
      },
    };

    let maxSize = -1;
    forEach(data, (s, i) => {
      if (maxSize < s.data.length) maxSize = s.data.length;
    });

    const newData = [];
    forEach(data, (s, i) => {
      ret.options.labels.push(s.name);
      ret.options.series[s.name] = {
        color: s.color,
        structure_id: s.id,
      };

      if (i === 0) {
        const dose_unit = s.Dose;
        const vol_unit = s.Volume;

        ret.options.xlabel = 'Dose (' + dose_unit + ')';
        ret.options.ylabel = 'Volume (' + vol_unit + ')';
        ret.options.labels[0] = 'Dose (' + dose_unit + ')';

        this.setState({
          dose_unit,
          vol_unit,
        });
      }

      let sDataLen = 0;
      let lastY = -1;
      forEach(s.data, (y, j) => {
        if (typeof y === 'string' && y.startsWith('x')) {
          y = +y.substr(1, y.length); // Ex: x2
          for (let k = 0; k < y; k++) {
            if (!newData[sDataLen])
              newData.push([s.pointStart + s.pointInterval * sDataLen]);

            newData[sDataLen][i + 1] = lastY;
            sDataLen++;
          }
        } else {
          if (!newData[sDataLen])
            newData.push([s.pointStart + s.pointInterval * sDataLen]);

          newData[sDataLen][i + 1] = y;
          sDataLen++;
          lastY = y;
        }
      });

      if (sDataLen < maxSize) {
        for (var j = sDataLen; j < maxSize; j++) {
          if (!newData[j]) newData.push([s.pointStart + s.pointInterval * j]);

          newData[j][i + 1] = null;
        }
      }
    });

    ret.data = newData;
    return ret;
  };

  parseDvhData = dvh_data => {
    const ret = {};

    forEach(dvh_data, (val, key) => {
      ret[key] = this.parseData(val);
    });

    return ret;
  };

  render() {
    const { error, dvhGraphData, dose_unit, vol_unit } = this.state;

    if (error) return <div className="ErrorContainer">{error}</div>;
    if (!dvhGraphData)
      return <div className="LoadingContainer">Carregando...</div>;

    return (
      <div className="DvhViewer">
        <Graph data={dvhGraphData} dose_unit={dose_unit} vol_unit={vol_unit} />
      </div>
    );
  }
}

DvhViewer.propTypes = {
  viewportData: PropTypes.shape({
    displaySet: PropTypes.shape({
      seriesInstanceUid: PropTypes.string,
      sopInstanceUid: PropTypes.string,
      studyInstanceUid: PropTypes.string,
      dicomWebClient: PropTypes.shape({
        wadoURL: PropTypes.string,
      }),
    }),
    studies: PropTypes.arrayOf(PropTypes.object),
  }),
};

const makeMapStateToProps = () => {
  const getDvhGraphData = makeGetDvhGraphData();
  return (state, ownProps) => {
    const { studyInstanceUid } = ownProps.viewportData.displaySet;
    return {
      dvh_data: getDvhGraphData(state, studyInstanceUid).data,
    };
  };
};

const ConnectedDvhViewer = connect(
  makeMapStateToProps,
  {
    fetchDvhGraphData: rtDataActions.fetchDvhGraphData,
  },
  null
)(DvhViewer);

export default ConnectedDvhViewer;
