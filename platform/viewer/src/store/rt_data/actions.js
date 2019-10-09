import axios from 'axios';

import { DATA_TYPES } from '../../constants';

const BASE_URL = `https://${window.location.hostname}`;
const URLS = {
  [DATA_TYPES.FICHA]: `${BASE_URL}/api/viewer/fichas/calcular`,
  [DATA_TYPES.GRAFICO_DVH]: `${BASE_URL}/api/viewer/dvhs/calcular`,
  [DATA_TYPES.CONTORNO]: `${BASE_URL}/api/viewer/ct-contours/calcular`,
  [DATA_TYPES.ESTRUTURAS]: `${BASE_URL}/api/viewer/structures/calcular`,
  [DATA_TYPES.BEAM_LINES]: `${BASE_URL}/api/viewer/beam_lines/calcular`,
};

const setLoading = (studyInstanceUid, data_type, loading) => ({
  type: 'RT_DATA.SET_LOADING',
  studyInstanceUid,
  data_type,
  loading,
});

const setData = (studyInstanceUid, data_type, data) => ({
  type: 'RT_DATA.SET_DATA',
  studyInstanceUid,
  data_type,
  data,
});

const clearAllData = () => ({
  type: 'RT_DATA.CLEAR_ALL_DATA',
});

const fetchData = (
  data_type,
  studyInstanceUid,
  axiosParams,
  dispatch,
  getState
) => {
  const { rt_data } = getState();
  const loading =
    (rt_data[studyInstanceUid] &&
      rt_data[studyInstanceUid][data_type] &&
      rt_data[studyInstanceUid][data_type].loading) ||
    false;

  if (loading) return null;

  dispatch(setLoading(studyInstanceUid, data_type, true));
  return axios
    .post(URLS[data_type], axiosParams)
    .then(({ data }) => dispatch(setData(studyInstanceUid, data_type, data)));
};

const fetchFichaData = (studyInstanceUid, axiosParams) => (
  dispatch,
  getState
) => {
  const data_type = DATA_TYPES.FICHA;
  return fetchData(
    data_type,
    studyInstanceUid,
    axiosParams,
    dispatch,
    getState
  );
};

const fetchDvhGraphData = (studyInstanceUid, axiosParams) => (
  dispatch,
  getState
) => {
  const data_type = DATA_TYPES.GRAFICO_DVH;
  return fetchData(
    data_type,
    studyInstanceUid,
    axiosParams,
    dispatch,
    getState
  );
};

const fetchContourData = (studyInstanceUid, axiosParams) => (
  dispatch,
  getState
) => {
  const data_type = DATA_TYPES.CONTORNO;
  return fetchData(
    data_type,
    studyInstanceUid,
    axiosParams,
    dispatch,
    getState
  );
};

const fetchStructuresData = (studyInstanceUid, axiosParams) => (
  dispatch,
  getState
) => {
  const data_type = DATA_TYPES.ESTRUTURAS;
  return fetchData(
    data_type,
    studyInstanceUid,
    axiosParams,
    dispatch,
    getState
  );
};

const fetchBeamLinesData = (studyInstanceUid, axiosParams) => (
  dispatch,
  getState
) => {
  const data_type = DATA_TYPES.BEAM_LINES;
  return fetchData(
    data_type,
    studyInstanceUid,
    axiosParams,
    dispatch,
    getState
  );
};

export default {
  setLoading,
  clearAllData,
  fetchFichaData,
  fetchDvhGraphData,
  fetchContourData,
  fetchStructuresData,
  fetchBeamLinesData,
};
