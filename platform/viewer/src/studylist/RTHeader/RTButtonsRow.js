import React from 'react';
import { ExpandableToolMenu, ToolbarButton } from '@ohif/ui';

const TYPES = {
  BUILT_IN: 'builtIn'
};

const BUTTONS = [
  {
    id: 'RT_Import',
    label: 'Importar',
    icon: 'RT_Export',
    type: TYPES.BUILT_IN,
    options: {
      behavior: 'OPEN_MODAL',
    },
    modal: {
      Component: null,
      props: {},
      id: 'RT_Import_Modal'
    },
  },
  {
    id: 'RT_Create_Dicom',
    label: 'Criar Dicom',
    icon: 'RT_Export',
    type: TYPES.BUILT_IN,
    options: {
      behavior: 'OPEN_MODAL',
    },
    modal: {
      Component: null,
      props: {},
      id: 'RT_Create_Dicom_Modal'
    },
  },
  {
    id: 'RT_Burn_CD',
    label: 'Gravar CD',
    icon: 'RT_Burn_CD',
    type: TYPES.BUILT_IN,
    options: {
      behavior: 'OPEN_MODAL',
    },
    modal: {
      Component: null,
      props: {},
      id: 'RT_Burn_CD_Modal'
    },
  },
  {
    id: 'RT_Export',
    label: 'Exportar',
    icon: 'RT_Export',
    type: TYPES.BUILT_IN,
    options: {
      behavior: 'OPEN_MODAL',
    },
    modal: {
      Component: null,
      props: {},
      id: 'RT_Export_Modal'
    },
  },
  {
    id: 'RT_Info',
    label: 'Informações',
    icon: 'RT_Info',
    type: TYPES.BUILT_IN,
    options: {
      behavior: 'OPEN_MODAL',
    },
    modal: {
      Component: null,
      props: {},

      id: 'RT_Info_Modal'
    },
  },
];

class RTButtonsRow extends React.Component {
  constructor(props) {
    super(props);

    this._handleBuiltIn = _handleBuiltIn.bind(this);

    this.state = {};
  }

  isButtonActive = button => {
    return false;
  };

  getOnHideModalHandler = id => () => {
    this.setState({ [id]: false });
  };

  getButtonsComps = () => {
    return BUTTONS.map(button => {
      let activeCommand = undefined;

      if (button.buttons && button.buttons.length) {
        const childButtons = button.buttons.map(childButton => {
          childButton.onClick = _handleElementChange.bind(this, childButton);

          if (this.isButtonActive(childButton)) activeCommand = childButton.id;

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
          childComp.onChange = _handleElementChange.bind(this, childComp);
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
          onClick={_handleElementChange.bind(this, button)}
          isActive={this.isButtonActive(button)}
        />
      );
    });
  };

  getButtonsModals = () => {
    return BUTTONS.map(button => {
      if (button.modal && button.modal.Component) {
        const { id, Component, props } = button.modal;
        props.onActive = _handleElementChange.bind(this, button.modal);

        return (
          <Component
            key={id}
            isOpen={!!this.state[button.id]}
            onHide={this.getOnHideModalHandler(button.id)}
            {...props}
          />
        );
      }
    })
  }

  render() {
    const buttonsComps = this.getButtonsComps();
    return (
      <div className="rt-buttons-row">
        <div>{buttonsComps}</div>
        <div></div>
      </div>
    );
  }
}

function _handleElementChange(element, evt) {
  if (element.commandName) {
    const options = Object.assign({ evt }, element.commandOptions);
    commandsManager.runCommand(element.commandName, options);
  }

  if (element.type === TYPES.BUILT_IN) {
    this._handleBuiltIn(element.id, element.options);
  }
}

function _handleBuiltIn(id, { behavior }) {
  if (behavior === 'OPEN_MODAL') {
    this.setState({
      [id]: true,
    });
  }
}

export { RTButtonsRow };
