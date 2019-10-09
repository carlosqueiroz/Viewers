import './Icon.styl';

import React from 'react';
import PropTypes from 'prop-types';
import getIcon from './getIcon.js';

const Icon = ({ showTitle, ...props }) => {
  const [id] = React.useState(
    'icon_' + (new Date().getTime().toString(36) + Math.random().toString(36))
  );

  React.useEffect(() => {
    const svg = document.getElementById(id);
    // pode ser uma div caso o name não seja encontrado...
    if(svg.tagName.toLowerCase() === 'svg') {
      let titleEl = svg.getElementsByTagName('title')[0];
      if (!showTitle && titleEl) {
        svg.removeChild(titleEl);
      } else if (showTitle) {
        if (!titleEl) {
          titleEl = document.createElement('title');
          svg.prepend(titleEl);
        }
        titleEl.innerHTML = props.title || props.name;
      }
    }
  }, [showTitle, props.title, props.name]);
  return getIcon(props.name, { ...props, id });
};

Icon.propTypes = {
  /** The string name of the icon to display */
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  showTitle: PropTypes.bool,
};

Icon.defaultProps = {
  showTitle: true,
};

export default Icon;
