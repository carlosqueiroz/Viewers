import DvhViewerSopClassHandler from './DvhViewerSopClassHandler.js';
import DvhViewer from './DvhViewer.js';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'dvh-viewer-extension',

  getViewportModule() {
    return DvhViewer;
  },
  getSopClassHandlerModule() {
    return DvhViewerSopClassHandler;
  },
};
