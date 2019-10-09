import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import { utils } from '@ohif/core';

import forEach from 'lodash.foreach';

import { MODALITIES } from '../constants';

import rtDataActions from '../store/rt_data/actions';
import { makeGetBeamLinesData } from '../store/rt_data/reducers';

import { makeGetBeamLinesState } from '../store/tools_state/reducers';

import ToolLoadingOverlay from './ToolLoadingOverlay';
import Toast from '../utils/Toast';

// import beam_lines_test from './beam_lines_test.json';
const beam_lines_test = {};

const BaseAnnotationTool = cornerstoneTools.import('base/BaseAnnotationTool');

export default class DrawBeamLinesTool extends BaseAnnotationTool {
  USE_CACHE = false;
  CACHE_TMP_STUDY_UID = '1';

  constructor(props = {}) {
    const defaultProps = {
      name: 'DrawBeamLinesTool',
      supportedInteractionTypes: [],
      configuration: {},
      // svgCursor: ellipticalRoiCursor,
    };

    super(props, defaultProps);

    this.id = new Date().getTime().toString(36) + Math.random().toString(36);

    this.state = {
      beams_lines: {},
      tool_state: {},

      fileNotFound: {},
      fetchingData: {},
      element: null,
    };

    this.overlay = new ToolLoadingOverlay(`o_${this.id}`);

    this.getBeamLinesData = makeGetBeamLinesData();
    this.getBeamLinesState = makeGetBeamLinesState();
    this.unsubscribe = null;
  }

  activeCallback(element) {
    // console.log('DrawBeamLinesTool:activeCallback', this.id);

    if (this.USE_CACHE && !this.state.beams_lines[this.CACHE_TMP_STUDY_UID]) {
      this.state.beams_lines[this.CACHE_TMP_STUDY_UID] = {
        data: beam_lines_test,
      };
    }
    if (!this.unsubscribe && !!window.store) {
      this.unsubscribe = window.store.subscribe(this.handleStoreChanges);
      this.handleStoreChanges();
    }
    // cornerstone.updateImage(element);
  }

  disabledCallback(element) {
    // console.log('DrawBeamLinesTool:disabledCallback');
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

    const oldState1 = this.state.beams_lines[studyInstanceUid];
    const currentState1 = this.getBeamLinesData(storeState, studyInstanceUid);

    const stateChanged1 = oldState1 !== currentState1;
    const shouldUpdateCanvas1 = stateChanged1 && !!currentState1.data;

    const oldState2 = this.state.tool_state[studyInstanceUid];
    const currentState2 = this.getBeamLinesState(storeState, studyInstanceUid);

    const stateChanged2 = oldState2 !== currentState2;
    const shouldUpdateCanvas2 = stateChanged2;

    if (stateChanged1 || stateChanged2) {
      if (stateChanged1)
        this.state.beams_lines[studyInstanceUid] = currentState1;
      if (stateChanged2)
        this.state.tool_state[studyInstanceUid] = currentState2;

      if (!insideRender && (shouldUpdateCanvas1 || shouldUpdateCanvas2)) {
        this.state.fetchingData[studyInstanceUid] = false;
        cornerstone.updateImage(this.state.element);
      }
    }
  };

  shoudFetchBeamLinesData = () => {
    const studyInstanceUid = this.getStudyInstanceUid();
    const state = this.state.beams_lines[studyInstanceUid];
    return !state || (!state.data && !state.loading);
  };

  fetchBeamLinesData = () => {
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
    let rtPlanInstanceUid = '';
    forEach(seriesList, function(v, i) {
      if (v.modality.toUpperCase() === MODALITIES.RTPLAN) {
        rtPlanInstanceUid = v.seriesInstanceUid;
      }
    });

    if (!rtPlanInstanceUid) {
      this.state.fileNotFound[studyInstanceUid] = true;
      this.state.fetchingData[studyInstanceUid] = false;
      return;
    }

    this.overlay.show(this.state.element);
    return window.store
      .dispatch(
        rtDataActions.fetchBeamLinesData(studyInstanceUid, {
          studyInstanceUid,
          seriesInstanceUids: [rtPlanInstanceUid, ctInstanceUid],
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
    // console.log('DrawBeamLinesTool:renderToolData', evt);
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

    let state = this.state.beams_lines[studyInstanceUid];
    if (!this.USE_CACHE) {
      if (!state) {
        this.handleStoreChanges(true);
        state = this.state.beams_lines[studyInstanceUid];
      }
      if (this.shoudFetchBeamLinesData()) {
        this.fetchBeamLinesData();
        return;
      }
    }

    if (!state || !state.data || !state.data.inicial) return;

    const coords = state.data;
    const ctx = evt.detail.canvasContext;

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(179,173,87)';
    ctx.lineWidth = 2;

    for (let i = 0; i < coords.inicial.length; i++) {
      ctx.moveTo(coords.inicial[i][0], coords.inicial[i][1]);
      ctx.lineTo(coords.final[i][0], coords.final[i][1]);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(215,140,73)';
    ctx.lineWidth = 2;

    for (let i = 0; i < coords.p1_ini.length; i++) {
      ctx.moveTo(coords.p1_ini[i][0], coords.p1_ini[i][1]);
      ctx.lineTo(coords.p1_fim[i][0], coords.p1_fim[i][1]);
      ctx.moveTo(coords.p2_ini[i][0], coords.p2_ini[i][1]);
      ctx.lineTo(coords.p2_fim[i][0], coords.p2_fim[i][1]);
      ctx.moveTo(coords.p3_ini[i][0], coords.p3_ini[i][1]);
      ctx.lineTo(coords.p3_fim[i][0], coords.p3_fim[i][1]);
    }
    ctx.stroke();
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
}
