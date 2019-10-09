import produce from 'immer';
import { createSelector } from 'reselect';

import forEach from 'lodash.foreach';

import { DATA_TYPES } from '../../constants';

const defaultState = {
  // 'studyInstanceUid': {
  //   'FICHA': {
  //     loading: false,
  //     data: null
  //   },
  //   'GRAFICO_DVH': {
  //     loading: false,
  //     data: null
  //   },
  //   'CONTORNO': {
  //     loading: false,
  //     data: null
  //   },
  // }
};

const rt_data = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'RT_DATA.SET_LOADING': {
        if (!draft[action.studyInstanceUid])
          draft[action.studyInstanceUid] = {};
        if (!draft[action.studyInstanceUid][action.data_type])
          draft[action.studyInstanceUid][action.data_type] = {};

        draft[action.studyInstanceUid][action.data_type].loading =
          action.loading;
        return draft;
      }
      case 'RT_DATA.SET_DATA': {
        if (!draft[action.studyInstanceUid])
          draft[action.studyInstanceUid] = {};
        if (!draft[action.studyInstanceUid][action.data_type])
          draft[action.studyInstanceUid][action.data_type] = {};

        draft[action.studyInstanceUid][action.data_type].loading = false;
        draft[action.studyInstanceUid][action.data_type].data = action.data;
        return draft;
      }
      case 'RT_DATA.CLEAR_ALL_DATA': {
        return defaultState;
      }
    }
  });

const emptyObj = {};
const getStudyData = (state, studyInstanceUid) =>
  state.rt_data[studyInstanceUid] || emptyObj;
const getRtData = state => state.rt_data || emptyObj;
const getStudyInstanceUids = (state, studyInstanceUids) => studyInstanceUids;

export const makeGetFichaData = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.FICHA] || emptyObj
  );

export const makeGetDvhGraphData = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.GRAFICO_DVH] || emptyObj
  );

export const makeGetContourData = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.CONTORNO] || emptyObj
  );

export const makeGetStructureData = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.ESTRUTURAS] || emptyObj
  );

export const makeGetStructuresData = () =>
  createSelector(
    [getRtData, getStudyInstanceUids],
    (rt_data, studyInstanceUids) => {
      const ret = {};
      forEach(studyInstanceUids, studyUid => {
        if (rt_data[studyUid] && rt_data[studyUid][DATA_TYPES.ESTRUTURAS]) {
          ret[studyUid] = rt_data[studyUid][DATA_TYPES.ESTRUTURAS].data;
        }
      });
      return ret;
    }
  );

export const makeGetBeamLinesData = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.BEAM_LINES] || emptyObj
  );

export default rt_data;
