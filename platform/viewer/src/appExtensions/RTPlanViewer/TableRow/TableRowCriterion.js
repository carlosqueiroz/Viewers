import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

class TableRowCriterion extends React.Component {
  renderDoubleData() {
    const limit = this.props.configs['ft-limite-aprovacao-mu'] || 20;
    const limitAbs = this.props.configs['ft-limite-aprovacao-mu-abs'] || 5;
    const limitPercent =
      this.props.configs['ft-limite-aprovacao-mu-percent'] || 5;

    const { title, data, shouldShowCol } = this.props;
    const ret = [];

    forEach(data.DoseMonitora_Open, (val, key) => {
      if (!shouldShowCol || shouldShowCol(key)) {
        const umOpen = +data.DoseMonitora_Open[key];
        const umCalcOpen = +data.UMCalculada_Open[key];
        const umFiltro = +data.DoseMonitora_Filtro[key];
        const umCalcFiltro = +data.UMCalculada_Filtro[key];

        const diffAbsOpen = Math.abs(umOpen - umCalcOpen);
        const diffAbsFiltro = Math.abs(umFiltro - umCalcFiltro);
        const diffPercentOpen = Math.abs(+data.DiffUMcalculada_Open[key]);
        const diffPercentFiltro = Math.abs(+data.DiffUMcalculada_Filtro[key]);

        let isOk = true;
        if (!Number.isNaN(umOpen)) {
          if (umOpen < limit) {
            isOk = diffAbsOpen < limitAbs;
          } else {
            isOk = diffPercentOpen < limitPercent;
          }
        }
        if (isOk && !Number.isNaN(umFiltro)) {
          if (umFiltro < limit) {
            isOk = diffAbsFiltro < limitAbs;
          } else {
            isOk = diffPercentFiltro < limitPercent;
          }
        }
        const limitClass = isOk ? 'limit-green' : 'limit-red';

        ret.push(
          <td key={`${title}_${key}`} className={limitClass}>
            {isOk ? 'Conforme' : 'Não Conforme'}
          </td>
        );
      }
    });

    return ret;
  }

  renderData() {
    const limit = this.props.configs['ft-limite-aprovacao-mu'] || 20;
    const limitAbs = this.props.configs['ft-limite-aprovacao-mu-abs'] || 5;
    const limitPercent =
      this.props.configs['ft-limite-aprovacao-mu-percent'] || 5;

    const { title, data, shouldShowCol } = this.props;
    const ret = [];

    forEach(data.DoseMonitora, (val, key) => {
      if (!shouldShowCol || shouldShowCol(key)) {
        const um = +data.DoseMonitora[key];
        const umCalc = +data.UMcalculada[key];
        const diffAbs = Math.abs(um - umCalc);
        const diffPercent = Math.abs(+data.DiffUMcalculada[key]);

        let isOk = true;
        if (!Number.isNaN(um)) {
          if (um < limit) {
            isOk = diffAbs < limitAbs;
          } else {
            isOk = diffPercent < limitPercent;
          }
        }
        const limitClass = isOk ? 'limit-green' : 'limit-red';

        ret.push(
          <td key={`${title}_${key}`} className={limitClass}>
            {isOk ? 'Conforme' : 'Não Conforme'}
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

TableRowCriterion.propTypes = {
  double: PropTypes.bool,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.object,
  shouldShowCol: PropTypes.func,
};

TableRowCriterion.defaultProps = {
  numberPrecision: 2,
};

const mapStateToProps = state => {
  return {
    configs: state.rt_configs,
  };
};

const ConnectedTableRowCriterion = connect(
  mapStateToProps,
  null,
  null
)(TableRowCriterion);

export default ConnectedTableRowCriterion;
