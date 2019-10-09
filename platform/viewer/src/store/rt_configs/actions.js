import axios from 'axios';

const updateConfigs = configs => ({
  type: 'RT_CONFIGS.ADD_CONFIGS',
  configs,
});

const getConfigs = () => dispatch => {
  const url = `https://${window.location.hostname}/api/viewer/fichas/configs`;
  axios
    .get(url)
    .then(({ data }) => dispatch(updateConfigs(data)))
    .catch(err => console.log('rt.actions.getConfigs.err:', err));
};

export default {
  getConfigs,
};
