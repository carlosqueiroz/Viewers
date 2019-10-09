import React from 'react';

import RTTabsRow from './RTTabsRow';
import RTButtonsRow from './RTButtonsRow';
import { RT_TABS_IDS } from '../../constants';

import './style.css';

class RTViewerHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: RT_TABS_IDS.LAYOUT,
    };
  }

  onActiveTabChange = id => {
    this.setState({
      activeTab: id,
    });
  };

  render() {
    const { activeTab } = this.state;
    const {
      handleSidePanelChange,
      selectedLeftSidePanel,
      selectedRightSidePanel,
    } = this.props;
    return (
      <div className="header-wrapper">
        <RTTabsRow
          activeTab={activeTab}
          onActiveTabChange={this.onActiveTabChange}
          handleSidePanelChange={handleSidePanelChange}
          selectedLeftSidePanel={selectedLeftSidePanel}
        />
        <RTButtonsRow
          activeTab={activeTab}
          handleSidePanelChange={handleSidePanelChange}
          selectedRightSidePanel={selectedRightSidePanel}
        />
      </div>
    );
  }
}

export default RTViewerHeader;
