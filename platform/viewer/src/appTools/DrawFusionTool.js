import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import { utils } from '@ohif/core';

import forEach from 'lodash.foreach';

import { FUSION_DEFAULTS } from '../constants';

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');
const emptyObj = {};

export default class DrawFusionTool extends BaseAnnotationTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'DrawFusionTool',
      supportedInteractionTypes: [],
      configuration: {},
      // svgCursor: ellipticalRoiCursor,
    };

    super(props, defaultProps);

    this.id = new Date().getTime().toString(36) + Math.random().toString(36);

    this.state = {
      fusion: emptyObj,

      element: null,
    };

    this.unsubscribe = null;
  }

  activeCallback(element) {
    // console.log('DrawFusionTool:activeCallback', this.id);

    if (!this.unsubscribe && !!window.store) {
      this.unsubscribe = window.store.subscribe(this.handleStoreChanges);
      this.handleStoreChanges();
    }
    // cornerstone.updateImage(element);
  }

  disabledCallback(element) {}

  handleStoreChanges = insideRender => {
    const storeState = window.store.getState();
    const { displaySetInstanceUid } = this.getStackData();

    if (!displaySetInstanceUid) return;

    const oldState = this.state.fusion;
    const currentState = this.getStateFusion(storeState, displaySetInstanceUid);

    const stateChanged = oldState !== currentState;
    const shouldUpdateCanvas =
      stateChanged &&
      oldState.displaySetInstanceUid !== currentState.displaySetInstanceUid;

    // console.log(oldState, currentState, stateChanged, shouldUpdateCanvas);
    if (stateChanged) {
      this.state.fusion = currentState;

      if (!insideRender && shouldUpdateCanvas) {
        cornerstone.updateImage(this.state.element);
      }
    }
  };

  renderToolData(evt) {
    this.state.element = evt.target;

    let state = this.state.fusion;
    if (state === emptyObj) {
      this.handleStoreChanges(true);
      state = this.state.fusion;
    }
    if (state === emptyObj) return;

    let layers = cornerstone.getLayers(this.state.element);
    if (!layers || !layers.length) {
      const image = cornerstone.getImage(this.state.element);
      const layerId = cornerstone.addLayer(this.state.element, image, {
        opacity: FUSION_DEFAULTS.OPACITY,
        viewport: {},
      });

      const fusionDisplaySet = this.getDisplaySet(state);
      const imgId = fusionDisplaySet.images[0].getImageId();

      cornerstone.loadAndCacheImage(imgId).then(fusionImage => {
        cornerstone.addLayer(this.state.element, fusionImage, {
          opacity: FUSION_DEFAULTS.OPACITY,
          viewport: {
            colormap: FUSION_DEFAULTS.COLORMAP,
          },
        });
      });

      // console.log('id', this.id, 'imgId', imgId);
      layers = cornerstone.getLayers(this.state.element);
      cornerstone.setActiveLayer(this.state.element, layerId);
    }

    // console.log('id', this.id, 'layers', layers);
  }

  getStackData = () => {
    try {
      if (!this.state.element) return {};

      const stackData = cornerstoneTools.getToolState(
        this.state.element,
        'stack'
      );

      if (!stackData || !stackData.data || !stackData.data.length) return {};
      else return stackData.data[0];
    } catch (e) {
      console.warn('getStackData: ', e);
      return {};
    }
  };

  getStateFusion = (storeState, displaySetInstanceUid) => {
    const { viewportSpecificData } = storeState.viewports;
    const { element } = this.state;
    let viewportData = null;
    forEach(viewportSpecificData, d => {
      if (
        (!viewportData || !viewportData.fusion) &&
        d.displaySetInstanceUid === displaySetInstanceUid &&
        d.dom == element
      )
        viewportData = d;
    });

    if (viewportData) return viewportData.fusion || emptyObj;
    else return emptyObj;
  };

  getDisplaySet = ({ studyInstanceUid, displaySetInstanceUid }) => {
    const { studyMetadataManager } = utils;
    const metadata = studyMetadataManager.get(studyInstanceUid);

    let displaySet = null;
    forEach(metadata.getDisplaySets(), d => {
      if (d.displaySetInstanceUid === displaySetInstanceUid) displaySet = d;
    });

    return displaySet;
  };
}
