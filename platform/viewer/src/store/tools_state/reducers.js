import produce from 'immer';
import { createSelector } from 'reselect';

import { DATA_TYPES } from '../../constants';

const defaultState = {
  // 'studyInstanceUid': {
  //   'CONTORNO': {
  //     active: true,
  //     children: {
  //       1: true, // struct_id: active?
  //       2: false
  //     }
  //   },
  //   'ESTRUTURAS': {
  //     active: false,
  //     children: null
  //   },
  //   'BEAM_LINES': {
  //     active: false,
  //     children: null
  //   },
  // }
};

const tools_state = (state = defaultState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'TOOLS_STATE.SET_ACTIVE': {
        if (!draft[action.studyInstanceUid])
          draft[action.studyInstanceUid] = {};
        if (!draft[action.studyInstanceUid][action.data_type])
          draft[action.studyInstanceUid][action.data_type] = {};

        draft[action.studyInstanceUid][action.data_type].active = action.active;
        return draft;
      }
      case 'TOOLS_STATE.SET_CHILDREN': {
        if (!draft[action.studyInstanceUid])
          draft[action.studyInstanceUid] = {};
        if (!draft[action.studyInstanceUid][action.data_type])
          draft[action.studyInstanceUid][action.data_type] = {};

        draft[action.studyInstanceUid][action.data_type].children =
          action.children;
        return draft;
      }
      case 'TOOLS_STATE.SET_DATA': {
        if (!draft[action.studyInstanceUid])
          draft[action.studyInstanceUid] = {};
        if (!draft[action.studyInstanceUid][action.data_type])
          draft[action.studyInstanceUid][action.data_type] = {};

        draft[action.studyInstanceUid][action.data_type] = {
          ...draft[action.studyInstanceUid][action.data_type],
          ...action.data,
        };
        return draft;
      }
      case 'TOOLS_STATE.CLEAR_ALL_DATA': {
        return defaultState;
      }
    }
  });

const emptyObj = {};
const getStudyData = (state, studyInstanceUid) =>
  state.tools_state[studyInstanceUid] || emptyObj;

export const makeGetContourState = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.CONTORNO] || emptyObj
  );

export const makeGetBeamLinesState = () =>
  createSelector(
    [getStudyData],
    studyData => studyData[DATA_TYPES.BEAM_LINES] || emptyObj
  );

export default tools_state;
