import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

import round from '../utils/round';

class TableRowText extends React.Component {
  renderData() {
    const {
      title,
      data,
      colorsObj,
      numberPrecision,
      shouldShowCol,
    } = this.props;
    const ret = [];

    forEach(data, (val, key) => {
      let text = val;
      if (!Number.isNaN(+text)) text = round(text, numberPrecision);
      if (!shouldShowCol || shouldShowCol(key))
        ret.push(
          <td key={`${title}_${key}`} className={colorsObj[key]}>
            {text}
          </td>
        );
    });

    return ret;
  }

  renderMultipleData() {
    const {
      title,
      data,
      colorsObj,
      numberPrecision,
      shouldShowCol,
    } = this.props;
    const ret = [];

    forEach(data[0], (val, key) => {
      if (!shouldShowCol || shouldShowCol(key))
        ret.push(
          <td key={`${title}_${key}`} className={colorsObj[key]}>
            <div className="d-flex flex-space-evenly">
              {data.map((v, i) => {
                let text = v[key];
                if (!Number.isNaN(+text)) text = round(text, numberPrecision);
                return <span key={`${key}_${i}`}>{text}</span>;
              })}
            </div>
          </td>
        );
    });

    return ret;
  }

  render() {
    const { title, dataKey, data } = this.props;
    const multiple = Array.isArray(data);
    if (!data || (multiple && (data.lenght < 1 || !data[0]))) return null;
    return (
      <tr>
        <th className="border-th" data-key={dataKey}>
          {title}
        </th>
        {multiple ? this.renderMultipleData() : this.renderData()}
      </tr>
    );
  }
}

TableRowText.propTypes = {
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  colorsObj: PropTypes.object.isRequired,
  numberPrecision: PropTypes.number,
  shouldShowCol: PropTypes.func,
};

TableRowText.defaultProps = {
  numberPrecision: 2,
};

export default TableRowText;
