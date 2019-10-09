import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { ToolbarButton } from '@ohif/ui';

import RTTabs from './RTTabs';

const BTN_SERIES = {
  label: 'Series',
  icon: 'th-large',
  value: 'studies',
};

class RTTabsRow extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  onToggleSeries = () => {
    if (this.props.handleSidePanelChange) {
      this.props.handleSidePanelChange('left', BTN_SERIES.value);
    }
  };

  render() {
    const {
      activeTab,
      onActiveTabChange,
      selectedLeftSidePanel,
      t,
    } = this.props;

    return (
      <div className="rt-tabs-row">
        <ToolbarButton
          label={t(BTN_SERIES.label)}
          shouldShowLabel={false}
          icon={'bars'}
          isActive={selectedLeftSidePanel === BTN_SERIES.value}
          onClick={this.onToggleSeries}
        />
        <Link
          to={{
            pathname: '/',
            state: { studyLink: this.props.location.pathname },
          }}
        >
          <ToolbarButton
            label="Lista de estudos"
            shouldShowLabel={false}
            icon={'search'}
          />
        </Link>
        <RTTabs activeTab={activeTab} onActiveTabChange={onActiveTabChange} />
      </div>
    );
  }
}

export default withTranslation('Common')(withRouter(RTTabsRow));
