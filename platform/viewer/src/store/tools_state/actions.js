const setActive = (studyInstanceUid, data_type, active) => ({
  type: 'TOOLS_STATE.SET_ACTIVE',
  studyInstanceUid,
  data_type,
  active,
});

const setChildren = (studyInstanceUid, data_type, children) => ({
  type: 'TOOLS_STATE.SET_CHILDREN',
  studyInstanceUid,
  data_type,
  children,
});

// Melhor usar assim porque economiza 1 rerender...
const setData = (studyInstanceUid, data_type, data) => ({
  type: 'TOOLS_STATE.SET_DATA',
  studyInstanceUid,
  data_type,
  data,
});

const clearAllData = () => ({
  type: 'TOOLS_STATE.CLEAR_ALL_DATA',
});

export default {
  setActive,
  setChildren,
  setData,
  clearAllData
};
