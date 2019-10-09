import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

import { equals, updateSyncState } from '../../utils/layersUtils';

const BaseTool = cornerstoneTools.import('base/BaseTool');
const { panCursor } = cornerstoneTools.import('tools/cursors');

export default class FusionPanTool extends BaseTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'FusionPanTool',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      svgCursor: panCursor,
    };

    super(props, defaultProps);

    // Touch
    this.touchDragCallback = this._dragCallback.bind(this);
    // Mouse
    this.mouseDragCallback = this._dragCallback.bind(this);
  }

  _dragCallback(evt) {
    const { element, image, deltaPoints } = evt.detail;
    if (element) {
      const layers = cornerstone.getLayers(element);
      if (layers && layers.length === 2) {
        // save original state
        if (layers[1].options.original_translation === undefined) {
          layers[1].options.original_translation = {
            ...layers[1].viewport.translation,
          };
        }

        const translation = this._getTranslation(
          layers[1].viewport,
          image,
          deltaPoints
        );

        layers[1].viewport.translation.x += translation.x;
        layers[1].viewport.translation.y += translation.y;
        layers[1].options.rt_translated =
          !equals(
            layers[0].viewport.translation.x,
            layers[1].viewport.translation.x
          ) ||
          !equals(
            layers[0].viewport.translation.y,
            layers[1].viewport.translation.y
          );

        updateSyncState(element, layers);
        cornerstone.updateImage(element);
      }
    }
  }

  _getTranslation(viewport, image, deltaPoints) {
    let widthScale = viewport.scale;
    let heightScale = viewport.scale;

    if (image.rowPixelSpacing < image.columnPixelSpacing) {
      widthScale *= image.columnPixelSpacing / image.rowPixelSpacing;
    } else if (image.columnPixelSpacing < image.rowPixelSpacing) {
      heightScale *= image.rowPixelSpacing / image.columnPixelSpacing;
    }

    return {
      x: deltaPoints.page.x / widthScale,
      y: deltaPoints.page.y / heightScale,
    };
  }
}
