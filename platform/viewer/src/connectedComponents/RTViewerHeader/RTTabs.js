import React from 'react';

import { RT_TABS_IDS } from '../../constants';

const tabs = [
  { id: RT_TABS_IDS.LAYOUT, title: 'Layout' },
  { id: RT_TABS_IDS.FERRAMENTAS, title: 'Ferramentas' },
  { id: RT_TABS_IDS.MANIPULACAO, title: 'Manipulação' },
  { id: RT_TABS_IDS.FUSAO, title: 'Fusão' },
  { id: RT_TABS_IDS.ANOTACOES, title: 'Anotações' },
  { id: RT_TABS_IDS.LAUDO, title: 'Laudo' },
  { id: RT_TABS_IDS.EXPORTACAO, title: 'Exportação' },
  { id: RT_TABS_IDS.IMPRESSAO, title: 'Impressão' },
];

class RTTabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onTabClick = id => {
    if (this.props.onActiveTabChange) this.props.onActiveTabChange(id);
  };

  getKeyDownHandler = id => {
    return event => {
      const key = event.which || event.keyCode;
      if (key === 13 || key === 32) // enter | space
        this.onTabClick(id);
    };
  };

  render() {
    const { activeTab } = this.props;
    return (
      <div className="rt-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`rt-tab ${activeTab === tab.id ? 'active' : ''} `}
            onClick={() => this.onTabClick(tab.id)}
            onKeyDown={this.getKeyDownHandler(tab.id)}
            role="tab"
            tabIndex="0"
          >
            {tab.title}
          </div>
        ))}
      </div>
    );
  }
}

export default RTTabs;
