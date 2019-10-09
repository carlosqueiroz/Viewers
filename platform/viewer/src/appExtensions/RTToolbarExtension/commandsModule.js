import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import OHIF from '@ohif/core';
import cloneDeep from 'lodash.clonedeep';

const { setViewportSpecificData } = OHIF.redux.actions;

import setLayoutAndViewportData from './utils/setLayoutAndViewportData';
import { equals, updateSyncState } from '../../utils/layersUtils';
import getFusionColormaps from '../../utils/getFusionColormaps';
import { FUSION_DEFAULTS } from '../../constants';

import activeMouseToolActions from '../../store/active_mouse_tool/actions.js';

const actions = {
  makeFusion: ({ evt }) => {
    const data = evt;
    const viewports = [
      { top: 0, left: 0, width: '50%', height: '50%' },
      { top: 0, left: '50%', width: '50%', height: '50%' },
      { top: '50%', left: 0, width: '25%', height: '50%' },
      { top: '50%', left: '25%', width: '25%', height: '50%' },
      { top: '50%', left: '50%', width: '25%', height: '50%' },
      { top: '50%', left: '75%', width: '25%', height: '50%' },
    ];
    const layout = {
      viewports,
    };
    const viewportSpecificData = {
      0: {
        ...data[0],
        fusion: {
          displaySetInstanceUid: data[1].displaySetInstanceUid,
          studyInstanceUid: data[1].studyInstanceUid,
        },
      },
      1: {
        ...data[2],
        fusion: {
          displaySetInstanceUid: data[3].displaySetInstanceUid,
          studyInstanceUid: data[3].studyInstanceUid,
        },
      },
      2: data[0],
      3: data[1],
      4: data[2],
      5: data[3],
    };

    setLayoutAndViewportData(layout, viewportSpecificData);

    // this.props.setLayout({ viewports });
    // this.props.setViewportSpecificData(0, {...data[0], fusion: true});
  },
  setFusionOpacity: ({ viewports, evt }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        layers[0].options.opacity = evt.leftValue / 100;
        layers[1].options.opacity = evt.rightValue / 100;
        cornerstone.updateImage(element);
      }
    }
  },
  increaseFusionOpacity: ({ viewports, evt }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        layers[0].options.opacity += evt.leftValue / 100;
        layers[1].options.opacity += evt.rightValue / 100;

        if (layers[0].options.opacity < 0) layers[0].options.opacity = 0;
        if (layers[0].options.opacity > 1) layers[0].options.opacity = 1;
        if (layers[1].options.opacity < 0) layers[1].options.opacity = 0;
        if (layers[1].options.opacity > 1) layers[1].options.opacity = 1;
        cornerstone.updateImage(element);
      }
    }
  },
  setFusionRotation: ({ viewports, evt }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        // save original state
        if (layers[1].options.original_rotation === undefined) {
          layers[1].options.original_rotation = layers[1].viewport.rotation;
        }

        const originalValue = layers[1].options.original_rotation;
        layers[1].viewport.rotation = originalValue + +evt.value;
        layers[1].options.rt_rotated = !equals(evt.value, 0);

        updateSyncState(element, layers);
        cornerstone.updateImage(element);
      }
    }
  },
  increaseFusionRotation: ({ viewports, evt }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        // save original state
        if (layers[1].options.original_rotation === undefined) {
          layers[1].options.original_rotation = layers[1].viewport.rotation;
        }

        layers[1].viewport.rotation += +evt.value;
        layers[1].options.rt_rotated = !equals(
          layers[1].viewport.rotation,
          layers[1].options.original_rotation
        );

        updateSyncState(element, layers);
        cornerstone.updateImage(element);
      }
    }
  },
  resetFusionState: ({ viewports }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        layers[0].options.opacity = FUSION_DEFAULTS.OPACITY;
        layers[1].options.opacity = FUSION_DEFAULTS.OPACITY;
        layers[1].viewport.colormap = FUSION_DEFAULTS.COLORMAP;
        delete layers[1].options.rt_scaled;
        delete layers[1].options.rt_rotated;
        delete layers[1].options.rt_translated;

        updateSyncState(element, layers);
        cornerstone.updateImage(element);
      }
    }
  },
  setFusionColormap: ({ viewports, evt }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        layers[1].viewport.colormap = evt.value;
        cornerstone.updateImage(element);
      }
    }
  },
  nextFusionColormap: ({ viewports }) => {
    const element = _getActiveViewportEnabledElement(
      viewports.viewportSpecificData,
      viewports.activeViewportIndex
    );
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        const options = getFusionColormaps();
        const currentColormap = layers[1].viewport.colormap;
        let currentColormapIdx = -1;

        options.forEach((cMap, idx) => {
          if (cMap.value === currentColormap) currentColormapIdx = idx;
        });
        currentColormapIdx += 1;
        if (currentColormapIdx >= options.length - 1) currentColormapIdx = 0;

        layers[1].viewport.colormap = options[currentColormapIdx].value;
        cornerstone.updateImage(element);
      }
    }
  },
  toggleCine: ({ viewports }) => {
    const viewportData =
      viewports.viewportSpecificData[viewports.activeViewportIndex];
    if (viewportData) {
      let cine = viewportData.cine || {
        isPlaying: false,
        cineFrameRate: 24,
      };
      cine = cloneDeep(cine);
      cine.isPlaying = !cine.isPlaying;

      window.store.dispatch(
        setViewportSpecificData(viewports.activeViewportIndex, {
          cine,
        })
      );
    }
  },
  setToolActive: ({ toolName }) => {
    if (!toolName) {
      console.warn('No toolname provided to setToolActive command');
    }
    cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });

    const { tools } = cornerstoneTools.store.state;
    const tool = tools.find(t => t.name === toolName);
    if (tool) {
      const { supportedInteractionTypes } = tool.initialConfiguration;
      if (
        supportedInteractionTypes &&
        supportedInteractionTypes.length &&
        (supportedInteractionTypes.includes('Mouse') ||
          supportedInteractionTypes.includes('Touch'))
      ) {
        window.store.dispatch(activeMouseToolActions.setActiveTool(toolName));
      }
    }
  },
};

const definitions = {
  makeFusion: {
    commandFn: actions.makeFusion,
    storeContexts: [],
    options: {},
    context: 'VIEWER',
  },
  setFusionOpacity: {
    commandFn: actions.setFusionOpacity,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  increaseFusionOpacity: {
    commandFn: actions.increaseFusionOpacity,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  setFusionRotation: {
    commandFn: actions.setFusionRotation,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  increaseFusionRotation: {
    commandFn: actions.increaseFusionRotation,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  resetFusionState: {
    commandFn: actions.resetFusionState,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  setFusionColormap: {
    commandFn: actions.setFusionColormap,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  nextFusionColormap: {
    commandFn: actions.nextFusionColormap,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  toggleCine: {
    commandFn: actions.toggleCine,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
  setToolActive: {
    commandFn: actions.setToolActive,
    storeContexts: [],
    options: {},
  },
};

/**
 * Grabs `dom` reference for the enabledElement of
 * the active viewport
 */
function _getActiveViewportEnabledElement(viewports, activeIndex) {
  const activeViewport = viewports[activeIndex] || {};
  return activeViewport.dom;
}

export default {
  actions,
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
