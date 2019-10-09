const resetLayerState = layers => {
  layers[1].viewport.scale = layers[0].viewport.scale;
  layers[1].viewport.rotation = layers[0].viewport.rotation;
  layers[1].viewport.translation = {
    x: layers[0].viewport.translation.x,
    y: layers[0].viewport.translation.y,
  };
  layers[1].viewport.hflip = layers[0].viewport.hflip;
  layers[1].viewport.vflip = layers[0].viewport.vflip;
  layers[1].syncProps = null;

  delete layers[1].options.original_scale;
  delete layers[1].options.original_rotation;
  delete layers[1].options.original_translation;
};

const areLayersSync = layers => {
  return (
    !layers[1].options.rt_scaled &&
    !layers[1].options.rt_rotated &&
    !layers[1].options.rt_translated
  );
};

const equals = (a, b) => Math.abs(a - b) <= 0.00001;

const updateSyncState = (element, layers) => {
  const enabledElement = cornerstone.getEnabledElement(element);
  enabledElement.syncViewports = areLayersSync(layers);
  if (enabledElement.syncViewports) resetLayerState(layers);
};

export { equals, updateSyncState };
