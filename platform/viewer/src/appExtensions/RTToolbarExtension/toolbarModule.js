import {
  FusionOpacity,
  FusionRotate,
  FusionColorMap,
  FusionModal
} from '../../connectedComponents/Fusion';

const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
  BUILT_IN: 'builtIn',
  TODO: 'todo',
  MODAL: 'modal'
};

const definitions = [
  // Ferramentas
  {
    id: 'RT_Windowing',
    label: 'Janelamento',
    icon: 'RT_Windowing',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Wwwc' },
  },
  {
    id: 'RT_Navigation',
    label: 'Navegar',
    icon: 'RT_Navigation',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'StackScroll' },
  },
  {
    id: 'RT_Pan',
    label: 'Pan',
    icon: 'RT_Pan',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Pan' },
  },
  {
    id: 'RT_Zoom',
    label: 'Zoom',
    icon: 'RT_Zoom',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Zoom' },
  },
  {
    id: 'RT_Measurement_Dropdown',
    label: 'Medição',
    icon: 'RT_Measurement',
    buttons: [
      {
        id: 'RT_Length',
        label: 'Comprimento',
        icon: 'RT_Length',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Length' },
      },
      {
        id: 'RT_Angle',
        label: 'Ângulo',
        icon: 'RT_Angle',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Angle' },
      },
      {
        id: 'RT_EllipticalRoi',
        label: 'Elipse',
        icon: 'RT_EllipticalRoi',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'EllipticalRoi' },
      },
      {
        id: 'RT_RectangleRoi',
        label: 'Retângulo',
        icon: 'RT_RectangleRoi',
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
      {
        id: 'Bidirectional',
        label: 'Bidirecional',
        icon: 'measure-target',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Bidirectional' },
      },

      {
        id: 'RT_Eraser',
        label: 'Apagar',
        icon: 'RT_Erase_Annotations',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Eraser' },
      },
    ],
  },
  {
    id: 'RT_Cine',
    label: 'CINE',
    icon: 'RT_Cine',
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
    icon: 'RT_Layout',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
    context: 'VIEWER',
  },
  {
    id: 'RT_Default_Layouts',
    label: 'Default',
    icon: 'RT_Default_Layouts',
    //
    context: 'VIEWER',
    type: TOOLBAR_BUTTON_TYPES.TODO,
    buttons: [
      {
        id: 'RT_Default_Layout_1',
        label: 'Layout 1',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_1',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '100%', height: '50%' },
            { top: '50%', left: 0, width: '50%', height: '50%' },
            { top: '50%', left: '50%', width: '50%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_2',
        label: 'Layout 2',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_2',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '50%' },
            { top: '50%', left: 0, width: '50%', height: '50%' },
            { top: 0, left: '50%', width: '50%', height: '100%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_3',
        label: 'Layout 3',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_3',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '50%' },
            { top: 0, left: '50%', width: '50%', height: '50%' },
            { top: '50%', left: 0, width: '100%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_4',
        label: 'Layout 4',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_4',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '100%' },
            { top: 0, left: '50%', width: '50%', height: '50%' },
            { top: '50%', left: '50%', width: '50%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_5',
        label: 'Layout 5',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_5',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '50%' },
            { top: '50%', left: 0, width: '50%', height: '50%' },
            { top: 0, left: '50%', width: '50%', height: '25%' },
            { top: '25%', left: '50%', width: '50%', height: '25%' },
            { top: '50%', left: '50%', width: '50%', height: '25%' },
            { top: '75%', left: '50%', width: '50%', height: '25%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_6',
        label: 'Layout 6',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_6',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '50%' },
            { top: 0, left: '50%', width: '50%', height: '50%' },
            { top: '50%', left: 0, width: '25%', height: '50%' },
            { top: '50%', left: '25%', width: '25%', height: '50%' },
            { top: '50%', left: '50%', width: '25%', height: '50%' },
            { top: '50%', left: '75%', width: '25%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_7',
        label: 'Layout 7',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_7',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '50%', height: '25%' },
            { top: '25%', left: 0, width: '50%', height: '25%' },
            { top: '50%', left: 0, width: '50%', height: '25%' },
            { top: '75%', left: 0, width: '50%', height: '25%' },
            { top: 0, left: '50%', width: '50%', height: '50%' },
            { top: '50%', left: '50%', width: '50%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_8',
        label: 'Layout 8',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_8',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '25%', height: '50%' },
            { top: 0, left: '25%', width: '25%', height: '50%' },
            { top: 0, left: '50%', width: '25%', height: '50%' },
            { top: 0, left: '75%', width: '25%', height: '50%' },
            { top: '50%', left: 0, width: '50%', height: '50%' },
            { top: '50%', left: '50%', width: '50%', height: '50%' },
          ],
        },
      },
      {
        id: 'RT_Default_Layout_9',
        label: 'Layout 9',
        shouldShowLabel: false,
        icon: 'RT_Default_Layout_9',
        //
        type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
        options: {
          behavior: 'SET_LAYOUT',
          viewports: [
            { top: 0, left: 0, width: '25%', height: '50%' },
            { top: 0, left: '25%', width: '50%', height: '50%' },
            { top: 0, left: '75%', width: '25%', height: '50%' },
            { top: '50%', left: 0, width: '25%', height: '50%' },
            { top: '50%', left: '25%', width: '25%', height: '50%' },
            { top: '50%', left: '50%', width: '25%', height: '50%' },
            { top: '50%', left: '75%', width: '25%', height: '50%' },
          ],
        },
      },
    ],
  },
  {
    id: 'RT_RotateRight',
    label: 'Rotacionar',
    icon: 'RT_RotateRight',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'rotateViewportCW',
  },
  {
    id: 'RT_FlipH',
    label: 'Inverter Horizontalmente',
    icon: 'RT_FlipH',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'flipViewportHorizontal',
  },
  {
    id: 'RT_FlipV',
    label: 'Inverter Verticalmente',
    icon: 'RT_FlipV',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'flipViewportVertical',
  },
  {
    id: 'RT_Sort',
    label: 'Ordenar',
    icon: 'RT_Sort',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Reset',
    label: 'Apagar',
    icon: 'RT_Reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetViewport',
  },
  {
    id: 'RT_CM',
    label: 'Escala 1:1 cm',
    icon: 'RT_CM',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_PX',
    label: 'Escala 1:1 px',
    icon: 'RT_PX',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Info',
    label: 'Informação',
    icon: 'RT_Info',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Manipulação
  {
    id: 'RT_Magnify',
    label: 'Magnificar',
    icon: 'RT_Magnify',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'Magnify' },
  },
  {
    id: 'RT_WwwcRegion',
    label: 'ROI Janela',
    icon: 'RT_WwwcRegion',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'WwwcRegion' },
  },
  {
    id: 'RT_Invert',
    label: 'Inverter',
    icon: 'RT_Invert',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'invertViewport',
  },
  {
    id: 'RT_MPR',
    label: 'MPR',
    icon: 'RT_MPR',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'mpr2d',
  },
  {
    id: 'RT_Generate_Series',
    label: 'Gerar Séries',
    icon: 'RT_Generate_Series',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_RAM',
    label: 'RAM',
    icon: 'RT_RAM',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Filters',
    label: 'Filtros',
    icon: 'RT_Filters',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_3D',
    label: '3D',
    icon: 'RT_3D',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Fusão
  {
    id: 'RT_Fusion',
    label: 'Fusão',
    icon: 'RT_Fusion',
    //
    type: TOOLBAR_BUTTON_TYPES.BUILT_IN,
    context: 'VIEWER',
    options: {
      // behavior: 'FUSION',
      behavior: 'OPEN_MODAL',
    },

    modal: {
      Component: FusionModal,
      props: {},

      id: 'RT_Fusion_Modal',
      type: TOOLBAR_BUTTON_TYPES.COMMAND,
      commandName: 'makeFusion',
    }
  },
  {
    id: 'RT_Fusion_Opacity',
    label: 'Opacidade',
    icon: 'RT_Windowing',
    //
    context: 'FUSION',
    components: [
      {
        id: 'RT_Fusion_Opacity_Comp',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'setFusionOpacity',
        Component: FusionOpacity,
      },
    ],
  },
  {
    id: 'RT_Fusion_Rotate',
    label: 'Rotacionar',
    icon: 'RT_RotateRight',
    //
    context: 'FUSION',
    components: [
      {
        id: 'RT_Fusion_Rotate_Comp',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'setFusionRotation',
        Component: FusionRotate,
      },
    ],
  },
  {
    id: 'RT_Fusion_Colormap',
    label: 'Colormap',
    icon: 'RT_Filters', // TODO: Pensar em novo icone
    //
    context: 'FUSION',
    components: [
      {
        id: 'RT_Fusion_ColorMap_Comp',
        //
        type: TOOLBAR_BUTTON_TYPES.COMMAND,
        commandName: 'setFusionColormap',
        Component: FusionColorMap,
      },
    ],
  },
  {
    id: 'RT_Fusion_Pan',
    label: 'Pan',
    icon: 'RT_Pan',
    //
    context: 'FUSION',
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'FusionPanTool' },
  },
  {
    id: 'RT_Fusion_Zoom',
    label: 'Zoom',
    icon: 'RT_Zoom',
    //
    context: 'FUSION',
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'FusionZoomTool' },
  },
  {
    id: 'RT_Fusion_Reset',
    label: 'Reset',
    icon: 'RT_Reset',
    //
    context: 'FUSION',
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetFusionState',
    commandOptions: {},
  },
  // Anotações
  {
    id: 'RT_Annotations',
    label: 'Anotações',
    icon: 'RT_Annotations',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setToolActive',
    commandOptions: { toolName: 'ArrowAnnotate' },
  },
  {
    id: 'RT_Erase_Annotations',
    label: 'Apagar',
    icon: 'RT_Erase_Annotations',

    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'clearAnnotations',
  },
  // Laudo
  {
    id: 'RT_Write_Report',
    label: 'Escrever Laudo',
    icon: 'RT_Write_Report',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Record_Report',
    label: 'Gravar Laudo',
    icon: 'RT_Record_Report',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Send_Report_PACS',
    label: 'Enviar para o PACS',
    icon: 'RT_Send_Report_PACS',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Print_Report',
    label: 'Imprimir Relatório',
    icon: 'RT_Print_Report',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  // Exportação
  {
    id: 'RT_Export',
    label: 'Exportar',
    icon: 'RT_Export',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Burn_CD',
    label: 'Gravar CD',
    icon: 'RT_Burn_CD',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Print_Add',
    label: 'Adicionar Impressão',
    icon: 'RT_Print_Add',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Print_Clear',
    label: 'Limpar Fila de Impressão',
    icon: 'RT_Print_Clear',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
  {
    id: 'RT_Print',
    label: 'Imprimir',
    icon: 'RT_Print',
    //
    type: TOOLBAR_BUTTON_TYPES.TODO,
  },
];

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
