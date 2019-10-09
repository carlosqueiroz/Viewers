import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

import { equals, updateSyncState } from '../../utils/layersUtils';

const BaseTool = cornerstoneTools.import('base/BaseTool');
const { zoomCursor } = cornerstoneTools.import('tools/cursors');
const { correctShift, changeViewportScale } = cornerstoneTools.import(
  'util/zoomUtils'
);
// const clipToBox = cornerstoneTools.import('util/clipToBox');

export default class FusionZoomTool extends BaseTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'FusionZoomTool',
      strategies: {
        default: defaultStrategy,
        // translate: translateStrategy,
        // zoomToCenter: zoomToCenterStrategy,
      },
      defaultStrategy: 'default',
      supportedInteractionTypes: ['Mouse', 'Touch'],
      configuration: {
        invert: false,
        preventZoomOutsideImage: false,
        minScale: 0.01,
        maxScale: 20.0,
      },
      svgCursor: zoomCursor,
    };

    super(props, defaultProps);
  }

  touchDragCallback(evt) {
    dragCallback.call(this, evt);
  }

  mouseDragCallback(evt) {
    dragCallback.call(this, evt);
  }
}

const dragCallback = function(evt) {
  const deltaY = evt.detail.deltaPoints.page.y;

  if (!deltaY) {
    return false;
  }

  this.applyActiveStrategy(evt, this._configuration);
};

function defaultStrategy(evt, configs) {
  const { invert, maxScale, minScale } = configs;
  const deltaY = evt.detail.deltaPoints.page.y;
  const ticks = invert ? -deltaY / 100 : deltaY / 100;
  const { element } = evt.detail;
  const [startX, startY, imageX, imageY] = [
    evt.detail.startPoints.page.x,
    evt.detail.startPoints.page.y,
    evt.detail.startPoints.image.x,
    evt.detail.startPoints.image.y,
  ];

  const layers = cornerstone.getLayers(element);
  if (layers && layers.length === 2) {
    // save original state
    if (layers[1].options.original_scale === undefined) {
      layers[1].options.original_scale = layers[1].viewport.scale;
    }

    const { viewport } = layers[1];

    changeViewportScale(viewport, ticks, {
      maxScale,
      minScale,
    });

    const newCoords = cornerstone.pageToPixel(element, startX, startY);
    let shift = {
      x: imageX - newCoords.x,
      y: imageY - newCoords.y,
    };
    shift = correctShift(shift, viewport);

    viewport.translation.x -= shift.x;
    viewport.translation.y -= shift.y;

    layers[1].options.rt_scaled = !equals(
      layers[0].viewport.scale,
      viewport.scale
    );

    updateSyncState(element, layers);
    cornerstone.updateImage(element);
  }
}
