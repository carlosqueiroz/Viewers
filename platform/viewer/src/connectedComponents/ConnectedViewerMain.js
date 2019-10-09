import OHIF from "@ohif/core";
import ViewerMain from "./ViewerMain";
import { connect } from "react-redux";

import rtDataActions from '../store/rt_data/actions';
import toolsStateActions from '../store/tools_state/actions';

const {
  setViewportSpecificData,
  clearViewportSpecificData
} = OHIF.redux.actions;

const mapStateToProps = state => {
  const { activeViewportIndex, layout, viewportSpecificData } = state.viewports;

  return {
    activeViewportIndex,
    layout,
    viewportSpecificData,
    viewports: state.viewports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setViewportSpecificData: (viewportIndex, data) => {
      dispatch(setViewportSpecificData(viewportIndex, data));
    },
    clearViewportSpecificData: () => {
      dispatch(clearViewportSpecificData());
    },
    rtDataClearAllData: () => {
      dispatch(rtDataActions.clearAllData());
    },
    toolsStateClearAllData: () => {
      dispatch(toolsStateActions.clearAllData());
    },
  };
};

const ConnectedViewerMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerMain);

export default ConnectedViewerMain;
