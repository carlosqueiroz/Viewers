const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
  BUILT_IN: 'builtIn',
  TODO: 'todo',
};

const definitions = [
  // Ferramentas
  {
    id: 'RT_Windowing',
    label: 'Windowing',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Navigation',
    label: 'Navigation',
    icon: 'bars',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'StackScroll' },
  },
  {
    id: 'RT_Pan',
    label: 'Pan',
    icon: 'arrows',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Pan' },
  },
  {
    id: 'RT_Zoom',
    label: 'Zoom',
    icon: 'search-plus',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Zoom' },
  },
  {
    id: 'RT_Measurement_Dropdown',
    label: 'Measurement',
    icon: 'ellipse-circle',
    buttons: [
      {
        id: 'RT_Length',
        label: 'Length',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Length' },
      },
      {
        id: 'RT_Angle',
        label: 'Angle',
        icon: 'angle-left',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Angle' },
      },
      {
        id: 'RT_EllipticalRoi',
        label: 'Ellipse',
        icon: 'circle-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'EllipticalRoi' },
      },
      {
        id: 'RT_RectangleRoi',
        label: 'Rectangle',
        icon: 'square-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'RectangleRoi' },
      },
      {
        id: 'DragProbe',
        label: 'Probe',
        icon: 'dot-circle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'DragProbe' },
      },
    ]
  },
  {
    id: 'RT_Cine',
    label: 'CINE',
    icon: 'youtube',
    //
    type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
    options: {
      behavior: 'CINE',
    },
  },
  // Layout
  {
    id: 'RT_Layout',
    label: 'Layout',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
    context: 'VIEWER'
  },
  {
    id: 'RT_Default_Layouts',
    label: 'Default',
    icon: 'times',
    //
    context: 'VIEWER',
    type: TOOLBAR_BUTTON_TYPES.TODO,
    buttons: [
      {
        id: 'RT_Default_Layout_1',
        label: 'Layout 1',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '100%', height: '50%'},
            {top: '50%', left: 0, width: '50%', height: '50%'},
            {top: '50%', left: '50%', width: '50%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_2',
        label: 'Layout 2',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '50%'},
            {top: '50%', left: 0, width: '50%', height: '50%'},
            {top: 0, left: '50%', width: '50%', height: '100%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_3',
        label: 'Layout 3',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '50%'},
            {top: 0, left: '50%', width: '50%', height: '50%'},
            {top: '50%', left: 0, width: '100%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_4',
        label: 'Layout 4',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '100%'},
            {top: 0, left: '50%', width: '50%', height: '50%'},
            {top: '50%', left: '50%', width: '50%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_5',
        label: 'Layout 5',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '50%'},
            {top: '50%', left: 0, width: '50%', height: '50%'},
            {top: 0, left: '50%', width: '50%', height: '25%'},
            {top: '25%', left: '50%', width: '50%', height: '25%'},
            {top: '50%', left: '50%', width: '50%', height: '25%'},
            {top: '75%', left: '50%', width: '50%', height: '25%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_6',
        label: 'Layout 6',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '50%'},
            {top: 0, left: '50%', width: '50%', height: '50%'},
            {top: '50%', left: 0, width: '25%', height: '50%'},
            {top: '50%', left: '25%', width: '25%', height: '50%'},
            {top: '50%', left: '50%', width: '25%', height: '50%'},
            {top: '50%', left: '75%', width: '25%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_7',
        label: 'Layout 7',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '50%', height: '25%'},
            {top: '25%', left: 0, width: '50%', height: '25%'},
            {top: '50%', left: 0, width: '50%', height: '25%'},
            {top: '75%', left: 0, width: '50%', height: '25%'},
            {top: 0, left: '50%', width: '50%', height: '50%'},
            {top: '50%', left: '50%', width: '50%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_8',
        label: 'Layout 8',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '25%', height: '50%'},
            {top: 0, left: '25%', width: '25%', height: '50%'},
            {top: 0, left: '50%', width: '25%', height: '50%'},
            {top: 0, left: '75%', width: '25%', height: '50%'},
            {top: '50%', left: 0, width: '50%', height: '50%'},
            {top: '50%', left: '50%', width: '50%', height: '50%'},
          ]
        },
      },
      {
        id: 'RT_Default_Layout_9',
        label: 'Layout 9',
        shouldShowLabel: false,
        icon: 'times',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            {top: 0, left: 0, width: '25%', height: '50%'},
            {top: 0, left: '25%', width: '50%', height: '50%'},
            {top: 0, left: '75%', width: '25%', height: '50%'},
            {top: '50%', left: 0, width: '25%', height: '50%'},
            {top: '50%', left: '25%', width: '25%', height: '50%'},
            {top: '50%', left: '50%', width: '25%', height: '50%'},
            {top: '50%', left: '75%', width: '25%', height: '50%'},
          ]
        },
      },
    ]
  },
  {
    id: 'RT_RotateRight',
    label: 'Rotate Right',
    icon: 'rotate-right',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'rotateViewportCW',
  },
  {
    id: 'RT_FlipH',
    label: 'Flip H',
    icon: 'ellipse-h',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'flipViewportHorizontal',
  },
  {
    id: 'RT_FlipV',
    label: 'Flip V',
    icon: 'ellipse-v',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'flipViewportVertical',
  },
  {
    id: 'RT_Sort',
    label: 'Sort',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Reset',
    label: 'Reset',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetViewport',
  },
  {
    id: 'RT_CM',
    label: 'Cm',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_PX',
    label: 'Px',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Info',
    label: 'Info',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Manipulação
  {
    id: 'RT_Magnify',
    label: 'Magnify',
    icon: 'circle',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Magnify' },
  },
  {
    id: 'RT_WwwcRegion',
    label: 'ROI Window',
    icon: 'stop',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'WwwcRegion' },
  },
  {
    id: 'RT_Invert',
    label: 'Invert',
    icon: 'adjust',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'invertViewport',
  },
  {
    id: 'RT_MPR',
    label: 'MPR',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Generate_Series',
    label: 'Generate Series',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Fusion',
    label: 'Fusion',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_RAM',
    label: 'RAM',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Filters',
    label: 'Filters',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_3D',
    label: '3D',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Anotações
  {
    id: 'RT_Annotations',
    label: 'Annotations',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Erase_Annotations',
    label: 'Erase',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Laudo
  {
    id: 'RT_Write_Report',
    label: 'Write',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Record_Report',
    label: 'Record',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Send_Report_PACS',
    label: 'Send to PACS',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Print_Report',
    label: 'Print',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Exportação
  {
    id: 'RT_Export',
    label: 'Export',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Burn_CD',
    label: 'Burn CD',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
];

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
