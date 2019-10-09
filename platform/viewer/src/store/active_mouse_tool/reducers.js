const defaultState = null;

const active_mouse_tool = (state = defaultState, action) => {
  switch (action.type) {
    case 'ACTIVE_MOUSE_TOOL.SET_ACTIVE_TOOL': {
      return action.tool_name;
    }
    default:
      return state;
  }
};

export default active_mouse_tool;
