import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

import round from '../utils/round';

class TableRowAbsoluteError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderDoubleData() {
    const {
      title,
      data,
      colorsObj,
      numberPrecision,
      shouldShowCol,
    } = this.props;
    const ret = [];

    forEach(data.DoseMonitora_Open, (val, key) => {
      if (!shouldShowCol || shouldShowCol(key)) {
        let diff1 = +data.DoseMonitora_Open[key] - +data.UMCalculada_Open[key];
        diff1 = Number.isNaN(diff1) ? '-' : round(diff1, numberPrecision);
        let diff2 =
          +data.DoseMonitora_Filtro[key] - +data.UMCalculada_Filtro[key];
        diff2 = Number.isNaN(diff2) ? '-' : round(diff2, numberPrecision);

        ret.push(
          <td key={`${title}_${key}`} className={colorsObj[key]}>
            <div className="d-flex flex-space-evenly">
              <span>{diff1}</span>
              <span>{diff2}</span>
            </div>
          </td>
        );
      }
    });

    return ret;
  }

  renderData() {
    const {
      title,
      data,
      colorsObj,
      numberPrecision,
      shouldShowCol,
    } = this.props;
    const ret = [];

    forEach(data.DoseMonitora, (val, key) => {
      if (!shouldShowCol || shouldShowCol(key)) {
        let diff = +data.DoseMonitora[key] - +data.UMcalculada[key];
        diff = Number.isNaN(diff) ? '-' : round(diff, numberPrecision);

        ret.push(
          <td key={`${title}_${key}`} className={colorsObj[key]}>
            {diff}
          </td>
        );
      }
    });

    return ret;
  }

  render() {
    const { title, dataKey, data, double } = this.props;
    if (
      !data ||
      (!double && !data.DoseMonitora) ||
      (double && !data.DoseMonitora_Open)
    )
      return null;
    return (
      <tr>
        <th className="border-th" data-key={dataKey}>
          {title}
        </th>
        {double ? this.renderDoubleData() : this.renderData()}
      </tr>
    );
  }
}

TableRowAbsoluteError.propTypes = {
  double: PropTypes.bool,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.object,
  colorsObj: PropTypes.object.isRequired,
  numberPrecision: PropTypes.number,
  shouldShowCol: PropTypes.func,
};

TableRowAbsoluteError.defaultProps = {
  numberPrecision: 2,
};

export default TableRowAbsoluteError;
