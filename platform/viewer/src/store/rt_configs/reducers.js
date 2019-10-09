const defaultState = {};

const rt_configs = (state = defaultState, action) => {
  switch (action.type) {
    case 'RT_CONFIGS.ADD_CONFIGS': {
      return {
        ...state,
        ...action.configs,
      };
    }
    default:
      return state;
  }
};

export default rt_configs;
