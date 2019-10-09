import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

class TableRowPhase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderData() {
    const { title, data, shouldShowCol } = this.props;
    const ret = [];
    let j = 0;

    forEach(data, ({ fase, campos }, key) => {
      for (let i = 1; i <= campos; i++) {
        j++;
        if (!shouldShowCol || shouldShowCol(j))
          ret.push(
            <th
              key={`${title}_${key}_${i}`}
              className={`color-${key}`}
              style={{ color: '#666' }}
            >
              {fase}
            </th>
          );
      }
    });

    return ret;
  }

  render() {
    if (!this.props.data) return null;
    const { title, dataKey } = this.props;
    return (
      <tr>
        <th className="border-th" data-key={dataKey}>
          {title}
        </th>
        {this.renderData()}
      </tr>
    );
  }
}

TableRowPhase.propTypes = {
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.object,
  shouldShowCol: PropTypes.func,
};

export default TableRowPhase;
