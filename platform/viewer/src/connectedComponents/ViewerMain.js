import './ViewerMain.css';

import OHIF from "@ohif/core";
import { Component } from 'react';
import ConnectedLayoutManager from './ConnectedLayoutManager.js';
import ConnectedToolContextMenu from './ConnectedToolContextMenu.js';
import PropTypes from 'prop-types';
import React from 'react';

import cornerstone from 'cornerstone-core';

class ViewerMain extends Component {
  static propTypes = {
    activeViewportIndex: PropTypes.number.isRequired,
    studies: PropTypes.array,
    viewportSpecificData: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setViewportSpecificData: PropTypes.func.isRequired,
    clearViewportSpecificData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      displaySets: [],
    };

    this.cachedViewportData = {};
  }

  getDisplaySets(studies) {
    const displaySets = [];
    studies.forEach(study => {
      study.displaySets.forEach(dSet => {
        if (!dSet.plugin) {
          dSet.plugin = 'cornerstone';
        }
        displaySets.push(dSet);
      });
    });

    return displaySets;
  }

  findDisplaySet(studies, studyInstanceUid, displaySetInstanceUid) {
    const study = studies.find(study => {
      return study.studyInstanceUid === studyInstanceUid;
    });

    if (!study) {
      return;
    }

    return study.displaySets.find(displaySet => {
      return displaySet.displaySetInstanceUid === displaySetInstanceUid;
    });
  }

  componentDidMount() {
    // Add beforeUnload event handler to check for unsaved changes
    //window.addEventListener('beforeunload', unloadHandlers.beforeUnload);

    // Get all the display sets for the viewer studies
    if (this.props.studies) {
      const displaySets = this.getDisplaySets(this.props.studies);

      this.setState({
        displaySets,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.studies !== prevProps.studies) {
      const displaySets = this.getDisplaySets(this.props.studies);

      this.setState({
        displaySets,
      });
    }
  }

  getViewportData = () => {
    const viewportData = [];
    const { layout, viewportSpecificData } = this.props;

    for (
      let viewportIndex = 0;
      viewportIndex < layout.viewports.length;
      viewportIndex++
    ) {
      let displaySet = viewportSpecificData[viewportIndex];

      // Use the cached display set in viewport if the new one is empty
      if (displaySet && !displaySet.displaySetInstanceUid) {
        displaySet = this.cachedViewportData[viewportIndex];
      }

      if (
        displaySet &&
        displaySet.studyInstanceUid &&
        displaySet.displaySetInstanceUid
      ) {
        // Get missing fields from original display set
        const originalDisplaySet = this.findDisplaySet(
          this.props.studies,
          displaySet.studyInstanceUid,
          displaySet.displaySetInstanceUid
        );
        viewportData.push(Object.assign({}, originalDisplaySet, displaySet));
      } else {
        // PS: Deixar viewport em branco quando ela é criada
        // If the viewport is empty, get one available in study
        // const { displaySets } = this.state;
        // console.log('displaySets', displaySets);
        // displaySet = displaySets.find(
        //   ds =>
        //     !viewportData.some(
        //       v => v.displaySetInstanceUid === ds.displaySetInstanceUid
        //     )
        // );
        // viewportData.push(Object.assign({}, displaySet));
        viewportData.push(null);
      }
    }

    this.cachedViewportData = viewportData;

    return viewportData;
  };

  setViewportData = ({ viewportIndex, item }) => {
    const displaySet = this.findDisplaySet(
      this.props.studies,
      item.studyInstanceUid,
      item.displaySetInstanceUid
    );

    this.props.setViewportSpecificData(viewportIndex, displaySet);
  };

  render() {
    return (
      <div className="ViewerMain">
        {this.state.displaySets.length && (
          <ConnectedLayoutManager
            studies={this.props.studies}
            viewportData={this.getViewportData()}
            setViewportData={this.setViewportData}
          >
            {/* Children to add to each viewport that support children */}
            <ConnectedToolContextMenu />
          </ConnectedLayoutManager>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    // Clear the entire viewport specific data
    const { viewportSpecificData } = this.props;
    Object.keys(viewportSpecificData).forEach(viewportIndex => {
      this.props.clearViewportSpecificData(viewportIndex);
    });

    this.props.rtDataClearAllData();
    this.props.toolsStateClearAllData();

    // TODO: These don't have to be viewer specific?
    // Could qualify for other routes?
    // hotkeys.destroy();

    // Remove beforeUnload event handler...
    // window.removeEventListener('beforeunload', unloadHandlers.beforeUnload);

    // Destroy the synchronizer used to update reference lines
    // OHIF.viewer.updateImageSynchronizer.destroy();

    // TODO: Instruct all plugins to clean up themselves
    //

    // Clear references to all stacks in the StackManager
    OHIF.utils.StackManager.clearStacks();

    // Clears OHIF.viewer.Studies collection
    // OHIF.viewer.Studies.removeAll();
    OHIF.utils.studyMetadataManager.purge();

    // Clears OHIF.viewer.StudyMetadataList collection
    // OHIF.viewer.StudyMetadataList.removeAll();

    // Clears Cornerstone image cache
    // https://github.com/cornerstonejs/cornerstoneWADOImageLoader/pull/223/files
    cornerstone.imageCache.cachedImages.forEach(({imageId}) => {
      const imgLoadObj = cornerstone.imageCache.getImageLoadObject(imageId);
      if (imgLoadObj && imgLoadObj.cancelFn) {
        imgLoadObj.cancelFn();
      }
    });
    cornerstone.imageCache.purgeCache();
    cornerstone.webGL.textureCache.purgeCache();
    window.cornerstoneWADOImageLoader.wadors.metaDataManager.purge();
    window.cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
    window.cornerstoneWADOImageLoader.wadouri.fileManager.purge();
  }
}

export default ViewerMain;
