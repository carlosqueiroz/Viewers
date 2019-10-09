import './toolbar-button.styl';

import { Icon } from './../elements/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { withTranslation } from '../utils/LanguageProvider';

export function ToolbarButton(props) {
  const {
    isActive,
    icon,
    labelWhenActive,
    shouldShowLabel,
    onClick,
    t,
  } = props;
  const className = classnames(props.className, { active: isActive });
  let label = isActive && labelWhenActive ? labelWhenActive : props.label;
  label = t(label);
  const iconProps =
    typeof icon === 'string' ? { name: icon } : icon;
  iconProps.showTitle = false;

  const arrowIconName = props.isExpanded ? 'caret-up' : 'caret-down';
  const arrowIcon = props.isExpandable && (
    <Icon name={arrowIconName} className="expand-caret" />
  );

  const handleClick = event => {
    if (onClick) {
      onClick(event, props);
    }
  };

  const handleKeyDown = event => {
    const key = event.which || event.keyCode;
    if((key === 13 || key === 32) && onClick) // enter | space
      onClick(event, props);
  };

  // TODO: Dar jeito no title, adicionar tooltip?
  return (
    <div
      className={className}
      title={t(label)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      {iconProps && <Icon {...iconProps} />}
      {shouldShowLabel ? (
        <div className="toolbar-button-label">
          {t(label)}
          {arrowIcon}
        </div>
      ) : null}
    </div>
  );
}

ToolbarButton.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
  /** Display label for button */
  label: PropTypes.string.isRequired,
  /** Determines if we show the label */
  shouldShowLabel: PropTypes.bool,
  /** Alternative text to show when button is active */
  labelWhenActive: PropTypes.string,
  className: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ]),
  onClick: PropTypes.func,
  /** Determines if we show expandable 'caret' symbol */
  isExpandable: PropTypes.bool,
  /** Direction of expandable 'caret' symbol */
  isExpanded: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

ToolbarButton.defaultProps = {
  isActive: false,
  className: 'toolbar-button',
  shouldShowLabel: true,
};

export default withTranslation('Buttons')(ToolbarButton);
