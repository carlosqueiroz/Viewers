import React from 'react';

import './style.css';

import { RTButtonsRow } from './RTButtonsRow';

class RTHeader extends React.Component {
  render() {
    return (
      <div className="header-wrapper">
        <RTButtonsRow />
      </div>
    );
  }
}

export { RTHeader };
