import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import { utils } from '@ohif/core';

import forEach from 'lodash.foreach';

import { MODALITIES } from '../constants';

import rtDataActions from '../store/rt_data/actions';
import { makeGetContourData } from '../store/rt_data/reducers';

import { makeGetContourState } from '../store/tools_state/reducers';

import ToolLoadingOverlay from './ToolLoadingOverlay';
import Toast from '../utils/Toast';

// import contour_test from './contour_test.json';
const contour_test = [];

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');

export default class DrawContourTool extends BaseAnnotationTool {
  USE_CACHE = false;
  CACHE_TMP_STUDY_UID = '1';

  constructor(props = {}) {
    const defaultProps = {
      name: 'DrawContourTool',
      supportedInteractionTypes: [],
      configuration: {},
      // svgCursor: ellipticalRoiCursor,
    };

    super(props, defaultProps);

    this.id = new Date().getTime().toString(36) + Math.random().toString(36);

    this.state = {
      contours: {},
      tool_state: {},

      fileNotFound: {},
      fetchingData: {},
      element: null,
    };

    this.overlay = new ToolLoadingOverlay(`o_${this.id}`);

    this.getContourData = makeGetContourData();
    this.getContourState = makeGetContourState();
    this.unsubscribe = null;
  }

  activeCallback(element, options) {
    // console.log('DrawContourTool:activeCallback', this.id);

    if (this.USE_CACHE && !this.state.contours[this.CACHE_TMP_STUDY_UID]) {
      this.state.contours[this.CACHE_TMP_STUDY_UID] = {
        data: contour_test,
      };
    }
    if (!this.unsubscribe && !!window.store) {
      this.unsubscribe = window.store.subscribe(this.handleStoreChanges);
      this.handleStoreChanges();
    }
    // cornerstone.updateImage(element);
  }

  disabledCallback(element, options) {
    // console.log('DrawContourTool:disabledCallback');
    // if (this.unsubscribe) {
    //   this.unsubscribe();
    //   this.unsubscribe = null;
    // }
    // const studyInstanceUid = this.getStudyInstanceUid();
    // const state = this.state.beams_lines[studyInstanceUid];
    // if (state && state.data) cornerstone.updateImage(element);
  }

  handleStoreChanges = insideRender => {
    const storeState = window.store.getState();
    const studyInstanceUid = this.getStudyInstanceUid();

    if (!studyInstanceUid) {
      return;
    }

    const oldState1 = this.state.contours[studyInstanceUid];
    const currentState1 = this.getContourData(storeState, studyInstanceUid);

    const stateChanged1 = oldState1 !== currentState1;
    const shouldUpdateCanvas1 = stateChanged1 && !!currentState1.data;

    const oldState2 = this.state.tool_state[studyInstanceUid];
    const currentState2 = this.getContourState(storeState, studyInstanceUid);

    const stateChanged2 = oldState2 !== currentState2;
    const shouldUpdateCanvas2 = stateChanged2;

    if (stateChanged1 || stateChanged2) {
      if (stateChanged1) this.state.contours[studyInstanceUid] = currentState1;
      if (stateChanged2)
        this.state.tool_state[studyInstanceUid] = currentState2;

      if (!insideRender && (shouldUpdateCanvas1 || shouldUpdateCanvas2)) {
        this.state.fetchingData[studyInstanceUid] = false;
        cornerstone.updateImage(this.state.element);
      }
    }
  };

  shoudFetchContourData = () => {
    const studyInstanceUid = this.getStudyInstanceUid();
    const state = this.state.contours[studyInstanceUid];
    return !state || (!state.data && !state.loading);
  };

  fetchContourData = () => {
    const studyInstanceUid = this.getStudyInstanceUid();
    if (!studyInstanceUid) return;

    this.state.fetchingData[studyInstanceUid] = true;
    const { studyMetadataManager } = utils;
    const metadata = studyMetadataManager.get(studyInstanceUid);

    if (!metadata) {
      this.state.fetchingData[studyInstanceUid] = false;
      return;
    }

    const displaySet = this.getDisplaySet();
    const ctInstanceUid = displaySet ? displaySet.seriesInstanceUid : null;

    const seriesList = metadata.getDataProperty('seriesList');
    let rtStructInstanceUid = '';
    forEach(seriesList, function(v, i) {
      if (v.modality.toUpperCase() === MODALITIES.RTSTRUCT) {
        rtStructInstanceUid = v.seriesInstanceUid;
      }
    });

    if (!rtStructInstanceUid || !ctInstanceUid) {
      this.state.fileNotFound[studyInstanceUid] = true;
      this.state.fetchingData[studyInstanceUid] = false;
      return;
    }

    this.overlay.show(this.state.element);
    return window.store
      .dispatch(
        rtDataActions.fetchContourData(studyInstanceUid, {
          studyInstanceUid,
          seriesInstanceUids: [rtStructInstanceUid, ctInstanceUid],
        })
      )
      .then(() => {
        this.overlay.hide();
      })
      .catch(e => {
        this.overlay.hide();
        this.onError(e);
      });
  };

  renderToolData(evt) {
    // console.log('DrawContourTool:renderToolData', evt);
    this.state.element = evt.target;
    const studyInstanceUid = this.getStudyInstanceUid();

    if (
      !studyInstanceUid ||
      this.state.fileNotFound[studyInstanceUid] ||
      this.state.fetchingData[studyInstanceUid] ||
      !this.state.tool_state ||
      !this.state.tool_state[studyInstanceUid] ||
      !this.state.tool_state[studyInstanceUid].active
    )
      return;

    let state = this.state.contours[studyInstanceUid];
    if (!this.USE_CACHE) {
      if (!state) {
        this.handleStoreChanges(true);
        state = this.state.contours[studyInstanceUid];
      }
      if (this.shoudFetchContourData()) {
        this.fetchContourData();
        return;
      }
    }

    if (!state || !state.data) return;

    const { currentImageIdIndex: imgIdx } = this.getStackData();
    const displaySet = this.getDisplaySet();

    if (!displaySet) return;

    let { sopInstanceUID: sopInstanceUid } = displaySet.getImage(imgIdx);
    if (this.USE_CACHE)
      sopInstanceUid = '1.2.276.0.20.1.4.4.185572756543.7336.1536775671.739015';

    const ctx = evt.detail.canvasContext;
    const tool_state = this.state.tool_state[studyInstanceUid];

    forEach(state.data, (data, id) => {
      // TODO: Verificar se é ms o sopInstanceUid !!
      const contour = data ? data[sopInstanceUid] : null;
      if (contour && tool_state.children[contour.id]) {
        forEach(contour.data, coords => {
          ctx.beginPath();
          ctx.strokeStyle =
            'rgb(' +
            contour.color[0] +
            ',' +
            contour.color[1] +
            ',' +
            contour.color[2] +
            ')';
          ctx.fillStyle =
            'rgba(' +
            contour.color[0] +
            ',' +
            contour.color[1] +
            ',' +
            contour.color[2] +
            ', 0.1)';
          ctx.lineWidth = 2;

          ctx.moveTo(coords[0][0], coords[0][1]);
          forEach(coords, coord => {
            ctx.lineTo(coord[0], coord[1]);
          });
          ctx.lineTo(coords[0][0], coords[0][1]);
          ctx.stroke();
          ctx.fill();
        });
      }
    });
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

  getStudyInstanceUid = () => {
    let { studyInstanceUid } = this.getStackData();
    if (this.USE_CACHE) studyInstanceUid = this.CACHE_TMP_STUDY_UID;
    return studyInstanceUid;
  };

  getDisplaySet = () => {
    const studyInstanceUid = this.getStudyInstanceUid();
    const { displaySetInstanceUid } = this.getStackData();
    const { studyMetadataManager } = utils;
    const metadata = studyMetadataManager.get(studyInstanceUid);

    let displaySet;
    forEach(metadata.getDisplaySets(), d => {
      if (d.displaySetInstanceUid === displaySetInstanceUid) displaySet = d;
    });

    if (!displaySet || displaySet.modality !== 'CT') return null;
    return displaySet;
  };

  onError = err => {
    if (err.response) console.error(err.response.data);
    else console.error(err);
    Toast.show({ html: 'Ocorreu um erro.', duration: 3000, background: 'red' });
  };

  // Eventos que não estão sendo usados...
  passiveCallback(element, options) {
    console.log('DrawContourTool:passiveCallback ', element, options);
  }

  enabledCallback(element, options) {
    console.log('DrawContourTool:enabledCallback ', element, options);
  }

  createNewMeasurement(eventData) {
    console.log('DrawContourTool:createNewMeasurement', eventData);
  }

  pointNearTool(element, data, coords, interactionType) {
    console.log('DrawContourTool:pointNearTool', data, coords);
  }

  updateCachedStats(event) {
    console.log('DrawContourTool:updateCachedStats', event);
  }
}
