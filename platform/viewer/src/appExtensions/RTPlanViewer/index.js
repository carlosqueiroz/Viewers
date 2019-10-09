import RTPlanViewerSopClassHandler from './RTPlanViewerSopClassHandler.js';
import RTPlanViewer from './RTPlanViewer.js';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'rtplan-viewer-extension',

  preRegistration(configs) {
    // console.log('RTPlanViewer->preRegistration:', configs);
  },
  getViewportModule() {
    return RTPlanViewer;
  },
  getSopClassHandlerModule() {
    return RTPlanViewerSopClassHandler;
  },
};
