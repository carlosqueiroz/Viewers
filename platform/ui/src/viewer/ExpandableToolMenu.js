import './ExpandableToolMenu.styl';

import { OverlayTrigger } from '../components/overlayTrigger';
import PropTypes from 'prop-types';
import React from 'react';
import ToolbarButton from './ToolbarButton.js';
import { Tooltip } from '../components/tooltip';

class ExpandableToolMenu extends React.Component {
  static propTypes = {
    /** Button label */
    label: PropTypes.string.isRequired,
    /** Array of buttons to render when expanded */
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        showShowLabel: PropTypes.bool,
        icon: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
        ]),
      })
    ),
    components: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
          .isRequired,
      })
    ),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ]),
    onGroupMenuClick: PropTypes.func,
    activeCommand: PropTypes.string,
  };

  static defaultProps = {
    buttons: [],
    components: [],
    icon: 'ellipse-circle',
    label: 'More',
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toolbarMenuOverlay = () => (
    <Tooltip
      placement="bottom"
      className="tooltip-toolbar-overlay"
      id={`${Math.random()}_tooltip-toolbar-overlay}`}
    >
      {this.getButtons()}
      {this.getComponents()}
    </Tooltip>
  );

  getComponents = () => {
    return this.props.components.map(({ Component, ...comp }, index) => {
      return <Component key={`c_${index}`} {...comp} />;
    });
  };

  getButtons = () => {
    return this.props.buttons.map((button, index) => {
      return (
        <ToolbarButton
          key={`b_${index}`}
          {...button}
          isActive={button.id === this.props.activeCommand}
        />
      );
    });
  };

  isActive = () => {
    let isActive = false;
    if (this.props.activeCommand) {
      this.props.buttons.forEach(button => {
        if (this.props.activeCommand === button.id) {
          isActive = true;
        }
      });
    }

    return isActive;
  };

  activeIcon = () => {
    if (this.props.activeCommand) {
      return (
        this.props.buttons.find(btn => this.props.activeCommand === btn.id)
          .icon || this.props.icon
      );
    }

    return this.props.icon;
  };

  onExpandableToolClick = () => {
    if (this.props.onGroupMenuClick) {
      this.props.onGroupMenuClick();
    }
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  onOverlayHide = () => {
    this.setState({
      isExpanded: false,
    });
  };

  render() {
    return (
      <OverlayTrigger
        key="menu-button"
        trigger="click"
        placement="bottom"
        rootClose={true}
        handleHide={this.onOverlayHide}
        onClick={this.onExpandableToolClick}
        overlay={this.toolbarMenuOverlay()}
      >
        <ToolbarButton
          key="menu-button"
          type="tool"
          label={this.props.label}
          icon={this.activeIcon()}
          className={'toolbar-button expandableToolMenu'}
          isActive={this.isActive()}
          isExpandable={true}
          isExpanded={this.state.isExpanded}
        />
      </OverlayTrigger>
    );
  }
}

export default ExpandableToolMenu;
