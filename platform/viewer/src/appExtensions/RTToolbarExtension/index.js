// import OHIFCornerstoneViewport from './OHIFCornerstoneViewport.js';
import commandsModule from './commandsModule.js';
import toolbarModule from './toolbarModule.js';

export default {
  id: 'rt-toobar-extension',

  // getViewportModule() {
  //   return OHIFCornerstoneViewport;
  // },
  getToolbarModule() {
    return toolbarModule;
  },
  getCommandsModule() {
    return commandsModule;
  },
};
