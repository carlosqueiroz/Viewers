import React from 'react';
import { connect } from 'react-redux';
import { MODULE_TYPES, redux as OHIF_REDUX } from '@ohif/core';
import {
  ExpandableToolMenu,
  RoundedButtonGroup,
  ToolbarButton,
} from '@ohif/ui';

import { getActiveContexts } from '../../store/layout/selectors.js';
import { commandsManager, extensionManager } from '../../App.js';

import ConnectedCineDialog from '../ConnectedCineDialog';
import ConnectedLayoutButton from '../ConnectedLayoutButton';
import { RT_TABS_IDS } from '../../constants';

const { setLayout } = OHIF_REDUX.actions;

const TAB_BUTTONS = {
  [RT_TABS_IDS.FERRAMENTAS]: [
    'RT_Windowing',
    'RT_Navigation',
    'RT_Pan',
    'RT_Zoom',
    'RT_Measurement_Dropdown',
    'RT_Cine',
  ],
  [RT_TABS_IDS.LAYOUT]: [
    'RT_Layout',
    'RT_Default_Layouts',
    'RT_RotateRight',
    'RT_FlipH',
    'RT_FlipV',
    'RT_Sort',
    'RT_Reset',
    'RT_CM',
    'RT_PX',
    'RT_Info',
  ],
  [RT_TABS_IDS.MANIPULACAO]: [
    'RT_Magnify',
    'RT_WwwcRegion',
    'RT_Invert',
    'RT_MPR',
    'RT_Generate_Series',
    'RT_RAM',
    'RT_Filters',
    'RT_3D',
  ],
  [RT_TABS_IDS.FUSAO]: [
    'RT_Fusion',
    'RT_Fusion_Opacity',
    'RT_Fusion_Rotate',
    'RT_Fusion_Colormap',
    'RT_Fusion_Pan',
    'RT_Fusion_Zoom',
    'RT_Fusion_Reset',
  ],
  [RT_TABS_IDS.ANOTACOES]: ['RT_Annotations', 'RT_Erase_Annotations'],
  [RT_TABS_IDS.LAUDO]: [
    'RT_Write_Report',
    'RT_Record_Report',
    'RT_Send_Report_PACS',
    'RT_Print_Report',
  ],
  [RT_TABS_IDS.EXPORTACAO]: ['RT_Export', 'RT_Burn_CD'],
  [RT_TABS_IDS.IMPRESSAO]: ['RT_Print_Add', 'RT_Print_Clear', 'RT_Print'],
};

class RTButtonsRow extends React.Component {
  constructor(props) {
    super(props);

    this.rightSideButtons = this._getRightSideButtons();
    this.toolsButtons = this._getToolsButtons();

    this._handleBuiltIn = _handleBuiltIn.bind(this);

    this.state = {
      toolbarButtons: this._getToolbarButtons(),
      activeButtons: this.props.activeTool ? [this.props.activeTool] : [],
      isCineDialogOpen: false,
      isFusionModalOpen: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const changed = { props: {}, state: {} };

    let keys = Object.keys(nextProps);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const oldValue = this.props[key];
      const newValue = nextProps[key];

      if (key === 'activeContexts') {
        if (this.activeContextsChanged(this.props, nextProps))
          changed.props[key] = true;
      } else if (oldValue === undefined) changed.props[key] = true;
      else if (oldValue !== newValue) changed.props[key] = true;
    }

    keys = Object.keys(nextState);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const oldValue = this.state[key];
      const newValue = nextState[key];

      if (oldValue === undefined) changed.state[key] = true;
      else if (oldValue !== newValue) changed.state[key] = true;
    }

    return (
      Object.keys(changed.props).length > 0 ||
      Object.keys(changed.state).length > 0
    );
  }

  componentDidUpdate(prevProps) {
    const activeToolChanged = prevProps.activeTool !== this.props.activeTool;
    const activeTabChanged = prevProps.activeTab !== this.props.activeTab;
    const activeContextsChanged = this.activeContextsChanged(
      prevProps,
      this.props
    );

    if (activeToolChanged) {
      this.setState({
        activeButtons: [this.props.activeTool],
        isCineDialogOpen: false,
      });
    }
    if (activeContextsChanged || activeTabChanged) {
      this.setState({
        toolbarButtons: this._getToolbarButtons(),
      });
    }
  }

  activeContextsChanged = (prevProps, nextProps) => {
    let changed = prevProps.activeContexts !== nextProps.activeContexts;

    if (changed && prevProps.activeContexts && nextProps.activeContexts) {
      if (prevProps.activeContexts.length === nextProps.activeContexts.length) {
        changed = false;
        for (let i = 0; i < prevProps.activeContexts.length; i++) {
          changed =
            changed ||
            prevProps.activeContexts[i] !== nextProps.activeContexts[i];
        }
      }
    }
    return changed;
  };

  isButtonActive = button => {
    const toolName =
      button.toolName ||
      (button.commandOptions && button.commandOptions.toolName);
    return (
      this.state.activeButtons.includes(button.id) ||
      (toolName && this.state.activeButtons.includes(toolName))
    );
  };

  _getRightSideButtons = () => {
    const ret = [];

    const panelModules = extensionManager.modules[MODULE_TYPES.PANEL];
    panelModules.forEach(panelExtension => {
      const panelModule = panelExtension.module;
      const defaultContexts = Array.from(panelModule.defaultContext);

      panelModule.menuOptions.forEach(menuOption => {
        const contexts = Array.from(menuOption.context || defaultContexts);

        const activeContextIncludesAnyPanelContexts = this.props.activeContexts.some(
          actx => contexts.includes(actx)
        );
        if (activeContextIncludesAnyPanelContexts) {
          const menuOptionEntry = {
            value: menuOption.target,
            icon: menuOption.icon,
            bottomLabel: menuOption.label,
          };
          ret.push(menuOptionEntry);
        }
      });
    });
    return ret;
  };

  _getToolsButtons = () => {
    const toolbarModules = extensionManager.modules[MODULE_TYPES.TOOLBAR];
    const ret = {};
    // console.log(toolbarModules);

    toolbarModules.forEach(extension => {
      const { definitions, defaultContext } = extension.module;
      if (extension.extensionId === 'rt-toobar-extension') {
        definitions.forEach(definition => {
          let id = definition.id;
          if (ret[definition.id]) {
            id = extension.extensionId + '_' + id;
            console.warn(
              'EXTENSIONS WITH SAME ID:',
              ret[definition.id],
              definition
            );
          }
          definition.defaultContext = defaultContext;
          ret[id] = definition;
        });
      }
    });
    return ret;
  };

  _getToolbarButtons = () => {
    const { activeTab } = this.props;
    const activeTabButtons = TAB_BUTTONS[activeTab];
    const ret = [];

    if (!activeTabButtons) return ret;

    activeTabButtons.forEach(btnId => {
      if (this.toolsButtons[btnId]) {
        const definition = this.toolsButtons[btnId];
        const context = definition.context || definition.defaultContext;
        if (this.props.activeContexts.includes(context)) {
          ret.push(definition);
        }
      }
    });
    // console.log('toobarButtons', ret);

    return ret;
  };

  _getButtonComponents = toolbarButtons => {
    return toolbarButtons.map(button => {
      let activeCommand = undefined;

      if (button.id === 'RT_Layout') {
        return <ConnectedLayoutButton key={button.id} />;
      } else if (button.buttons && button.buttons.length) {
        // Iterate over button definitions and update `onClick` behavior
        const childButtons = button.buttons.map(childButton => {
          childButton.onClick = _handleToolbarButtonClick.bind(
            this,
            childButton
          );

          if (this.isButtonActive(childButton)) {
            activeCommand = childButton.id;
          }

          return childButton;
        });

        return (
          <ExpandableToolMenu
            key={button.id}
            label={button.label}
            icon={button.icon}
            buttons={childButtons}
            activeCommand={activeCommand}
          />
        );
      } else if (button.components && button.components.length) {
        const childComps = button.components.map(childComp => {
          childComp.onChange = _handleToolbarCompChange.bind(this, childComp);
          return childComp;
        });

        return (
          <ExpandableToolMenu
            key={button.id}
            label={button.label}
            icon={button.icon}
            components={childComps}
            activeCommand={activeCommand}
          />
        );
      }
      return (
        <ToolbarButton
          key={button.id}
          label={button.label}
          icon={button.icon}
          onClick={_handleToolbarButtonClick.bind(this, button)}
          isActive={this.isButtonActive(button)}
        />
      );
    });
  };

  onRightButtonClick = value => {
    this.props.handleSidePanelChange('right', value);
  };

  getOnHideModalHandler = id => () => {
    this.setState({ [id]: false });
  };

  _getButtonsModals = toolsButtons => {
    // console.log('toolsButtons', toolsButtons);
    return Object.values(toolsButtons).map(button => {
      if (button.modal) {
        const { id, Component, props } = button.modal;
        props.onActive = _handleModalOnActive.bind(this, button.modal);

        return (
          <Component
            key={id}
            isOpen={!!this.state[button.id]}
            onHide={this.getOnHideModalHandler(button.id)}
            {...props}
          />
        );
      }
    });
  };

  render() {
    const buttonComponents = this._getButtonComponents(
      this.state.toolbarButtons
    );
    const modals = this._getButtonsModals(this.toolsButtons);

    const cineDialogContainerStyle = {
      display: this.state.isCineDialogOpen ? 'block' : 'none',
      position: 'absolute',
      top: '119px', //82px
      zIndex: 999,
    };

    return (
      <div className="rt-buttons-row">
        <div>{buttonComponents}</div>
        <div>
          <RoundedButtonGroup
            options={this.rightSideButtons}
            value={this.props.selectedRightSidePanel || ''}
            onValueChanged={this.onRightButtonClick}
          />
        </div>
        <div className="CineDialogContainer" style={cineDialogContainerStyle}>
          <ConnectedCineDialog />
        </div>
        {/* <FusionModal
          isOpen={this.state.isFusionModalOpen}
          onHide={this.onFusionModalHide}
          onFusionClick={this.onFusionClick}
        /> */}
        {modals}
      </div>
    );
  }
}

function _handleToolbarButtonClick(button, evt, props) {
  if (button.commandName) {
    const options = Object.assign({ evt }, button.commandOptions);
    commandsManager.runCommand(button.commandName, options);
  }

  if (button.type === 'builtIn') {
    this._handleBuiltIn(button.id, button.options);
  }
}

function _handleModalOnActive(modal, evt, props) {
  if (modal.commandName) {
    const options = Object.assign({ evt }, modal.commandOptions);
    commandsManager.runCommand(modal.commandName, options);
  }

  if (modal.type === 'builtIn') {
    this._handleBuiltIn(modal.id, modal.options);
  }
}

function _handleToolbarCompChange(comp, evt, props) {
  if (comp.commandName) {
    const options = Object.assign({ evt }, comp.commandOptions);
    commandsManager.runCommand(comp.commandName, options);
  }

  if (comp.type === 'builtIn') {
    this._handleBuiltIn(comp.id, comp.options);
  }
}

function _handleBuiltIn(id, { behavior, viewports } = {}) {
  if (behavior === 'CINE') {
    const isOpen = !this.state.isCineDialogOpen;
    const activeButtons = isOpen
      ? [...this.state.activeButtons, id]
      : this.state.activeButtons.filter(aId => aId !== id);

    this.setState({
      isCineDialogOpen: isOpen,
      activeButtons,
    });
  } else if (behavior === 'SET_LAYOUT') {
    this.props.setLayout({ viewports });
  } else if (behavior === 'OPEN_MODAL') {
    this.setState({
      [id]: true,
    });
  }
}

const mapStateToProps = state => {
  return {
    activeContexts: getActiveContexts(state),
    activeTool: state.active_mouse_tool,
  };
};

export default connect(
  mapStateToProps,
  { setLayout }
)(RTButtonsRow);
