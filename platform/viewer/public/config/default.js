window.config = {
  // default: '/'
  routerBasename: '/',
  extensions: [],
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://192.168.0.95:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://192.168.0.95:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://192.168.0.95:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        requestOptions: {
          requestFromBrowser: true,
        },
      },
    ],
  },
  // Extensions should be able to suggest default values for these?
  // Or we can require that these be explicitly set
  hotkeys: [
    // ~ Global
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Image Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Image Viewport',
      keys: ['left'],
    },
    // Supported Keys: https://craig.is/killing/mice
    // ~ Cornerstone Extension
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    // clearAnnotations
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // firstImage
    // lastImage
    {
      commandName: 'nextViewportDisplaySet',
      label: 'Previous Series',
      keys: ['pagedown'],
    },
    {
      commandName: 'previousViewportDisplaySet',
      label: 'Next Series',
      keys: ['pageup'],
    },
    // ~ Cornerstone Tools
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Pan' },
      label: 'Pan',
      keys: ['t'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Wwwc' },
      label: 'Windowing',
      keys: ['w'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'StackScroll' },
      label: 'Navegar',
      keys: ['s'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'EllipticalRoi' },
      label: 'Measure',
      keys: ['m'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Length' },
      label: 'Length',
      keys: ['d'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Angle' },
      label: 'Angle',
      keys: ['a'],
    },
    {
      commandName: 'toggleCine',
      commandOptions: {},
      label: 'Toggle Cine',
      keys: ['c'],
    },
    // Fusion
    {
      commandName: 'increaseFusionOpacity',
      commandOptions: { evt: { leftValue: 10, rightValue: -10 } },
      label: 'Increase Fusion CR Opacity',
      keys: ['shift+w'],
    },
    {
      commandName: 'increaseFusionOpacity',
      commandOptions: { evt: { leftValue: -10, rightValue: 10 } },
      label: 'Increase Fusion DRR Opacity',
      keys: ['shift+e'],
    },
    {
      commandName: 'increaseFusionRotation',
      commandOptions: { evt: { value: 15 } },
      label: 'Rotate Fusion Right',
      keys: ['shift+r'],
    },
    {
      commandName: 'increaseFusionRotation',
      commandOptions: { evt: { value: -15 } },
      label: 'Rotate Fusion Left',
      keys: ['shift+l'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'FusionPanTool' },
      label: 'Pan Fusion',
      keys: ['shift+t'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'FusionZoomTool' },
      label: 'Zoom Fusion',
      keys: ['shift+z'],
    },
    {
      commandName: 'resetFusionState',
      commandOptions: {},
      label: 'Reset Fusion State',
      keys: ['shift+space'],
    },
    {
      commandName: 'nextFusionColormap',
      commandOptions: {},
      label: 'Next Fusion Color Map',
      keys: ['shift+m'],
    },
    { // TODO: REMOVER DEPOIS!
      commandName: 'setToolActive',
      commandOptions: { toolName: 'DrawDoseTool' },
      label: 'Draw Dose Tool',
      keys: ['shift+d'],
    },
  ],
};
