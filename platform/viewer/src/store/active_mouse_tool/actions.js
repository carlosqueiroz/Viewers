const setActiveTool = tool_name => ({
  type: 'ACTIVE_MOUSE_TOOL.SET_ACTIVE_TOOL',
  tool_name,
});

export default {
  setActiveTool,
};