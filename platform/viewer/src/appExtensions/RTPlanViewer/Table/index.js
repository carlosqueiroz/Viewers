import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';

import './styles.css';
import Rows from '../TableRow';

class Table extends React.Component {

  componentDidMount() {
    this.updateCssVars();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.configs !== this.props.configs)
      this.updateCssVars();
  }

  updateCssVars() {
    const {configs} = this.props;
    // console.log('configs', configs);
    if(configs && configs['ft-color-1']) {
      const root = document.documentElement;
      root.style.setProperty('--ft-color-1', configs['ft-color-1']);
      root.style.setProperty('--ft-color-2', configs['ft-color-2']);
      root.style.setProperty('--ft-color-3', configs['ft-color-3']);
      root.style.setProperty('--ft-color-4', configs['ft-color-4']);
      root.style.setProperty('--ft-color-5', configs['ft-color-5']);

      root.style.setProperty('--ft-color-header', configs['ft-color-header']);
      root.style.setProperty('--ft-color-text-header', configs['ft-color-text-header']);
      root.style.setProperty('--ft-color-text', configs['ft-color-text']);
      root.style.setProperty('--ft-border-table-mu', configs['ft-border-table-mu']+'px');
    }
  }

  getColorsObj() {
    const { data } = this.props;
    const ret = {};
    let j = 1;

    forEach(data.FasesCampos, ({ campos }, key) => {
      for (let i = 1; i <= campos; i++) {
        const k = ((key-1)%5)+1;
        ret[`${j++}`] = `color-${k}`;
      }
    });

    return ret;
  }

  hasConeEletronsData() {
    const { data } = this.props;
    const ret = false;
    forEach(data.ConeEletrons, (v, i) => {
      if (v !== '-') ret = true;
    });
    return ret;
  }

  shouldShowCol = index => {
    const { data } = this.props;
    const val = data.DoseMonitora[index];
    // Esconde campos de SETUP
    if((+val) === 0)
      return false;
    return true;
  }

  render() {
    if (!this.props.data)
      return null;

    const { data, configs } = this.props;
    const colorsObj = this.getColorsObj();
    const hasCone = this.hasConeEletronsData();
    const showBevs = configs['ft-table-bev-mu'] || 0;

    // TODO: Lidar com scroll horizontal !?

    return (
      <table className="ficha">
        <tbody>
          <Rows.TableRowPhase
            title="Fase"
            dataKey="FasesCampos"
            data={data.FasesCampos}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="ID da Máquina"
            dataKey="Maquina"
            data={data.Maquina}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Energia"
            dataKey="energia"
            data={data.energia}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Nome do Campo"
            dataKey="Nomedocampo"
            data={data.Nomedocampo}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          {showBevs ? (<Rows.TableRowImage
            title="BEV"
            dataKey="bev_path"
            data={data.bev_path}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />) : null}
          <Rows.TableRowText
            title="Ponto de Cálculo (x/y)"
            dataKey="PontoCalculoX,PontoCalculoY"
            data={[data.PontoCalculoX, data.PontoCalculoY]}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="SSD [cm]"
            dataKey="ssd"
            data={data.ssd}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Gantry-I"
            dataKey="gantryINICIAL"
            data={data.gantryINICIAL}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Gantry-F"
            dataKey="GantryFINAL"
            data={data.GantryFINAL}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          {hasCone ? (
            <Rows.TableRowText
              title="Cone"
              dataKey="ConeEletrons"
              data={data.ConeEletrons}
              colorsObj={colorsObj}
              shouldShowCol={this.shouldShowCol}
            />
          ) : null}
          <Rows.TableRowText
            title="Colimador"
            dataKey="Colimador"
            data={data.Colimador}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Mesa"
            dataKey="Mesa"
            data={data.Mesa}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Bolus"
            dataKey="Bolus"
            data={data.Bolus}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Filtro"
            dataKey="Filtro"
            data={data.Filtro}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Geometria"
            dataKey="TecnicaTratamento"
            data={data.TecnicaTratamento}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Tipo de Campo"
            dataKey="Tipodecampo"
            data={data.Tipodecampo}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Prof. Isocentro [cm]"
            dataKey="ProfIsocentro"
            data={data.ProfIsocentro}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Campo Equiv. [cm2]"
            dataKey="CampoEquiv"
            data={data.CampoEquiv}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Campo Equiv. Col. [cm2]"
            dataKey="CampoEquivColimado"
            data={data.CampoEquivColimado}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Prof. Pto. Calculo [cm]"
            dataKey="ProfCalculo"
            data={data.ProfCalculo}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Prof. Pto. Calculo Eff. [cm]"
            dataKey="ProfCalculoEfetivo"
            data={data.ProfCalculoEfetivo}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="SSD Pto. Calculo [cm]"
            dataKey="ssdCalculo"
            data={data.ssdCalculo}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Dist. Off-Axis[cm]"
            dataKey="DistOffAxis"
            data={data.DistOffAxis}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Dist. Off-Axis Filtro [cm]"
            dataKey="DistOffAxisFiltro"
            data={data.DistOffAxisFiltro}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="PDP/TMR"
            dataKey="pesquisaTMRPDP"
            data={data.pesquisaTMRPDP}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="PDP/TMR [valor]"
            dataKey="TMRPDP"
            data={data.TMRPDP}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Inverso Q. Dist."
            dataKey="IQD"
            data={data.IQD}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Off-Axis"
            dataKey="fatorOffAxis"
            data={data.fatorOffAxis}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Off-Axis Filtro"
            dataKey="fatorOffAxisFiltro"
            data={data.fatorOffAxisFiltro}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="F. Campo"
            dataKey="fatorSc"
            data={data.fatorSc}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="F. Espalhamento"
            dataKey="fatorSp"
            data={data.fatorSp}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="F. Rendimento"
            dataKey="fatorScp"
            data={data.fatorScp}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Calibracao [cGy/MU]"
            dataKey="fatorCali"
            data={data.fatorCali}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="F. Bandeja"
            dataKey="fatorbandeja"
            data={data.fatorbandeja}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="F. Filtro"
            dataKey="fatorfiltro"
            data={data.fatorfiltro}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Dose Ref [Gy]"
            dataKey="DosePntRefPrimaria"
            data={data.DosePntRefPrimaria}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />

          <Rows.TableRowText
            title="UM TPS (open/wdg)"
            dataKey="DoseMonitora_Open,DoseMonitora_Filtro"
            data={[data.DoseMonitora_Open, data.DoseMonitora_Filtro]}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="UM Calculada (open/wdg)"
            dataKey="UMCalculada_Open,UMCalculada_Filtro"
            data={[data.UMCalculada_Open, data.UMCalculada_Filtro]}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Diff (open/wdg) [%]"
            dataKey="DiffUMcalculada_Open,DiffUMcalculada_Filtro"
            data={[data.DiffUMcalculada_Open, data.DiffUMcalculada_Filtro]}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowAbsoluteError
            title="Diff (open/wdg) [abs]"
            dataKey="DiffOpenAbs,DiffFiltroAbs"
            data={data}
            colorsObj={colorsObj}
            double
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowCriterion
            title="Critério"
            dataKey="Criterio"
            data={data}
            double
            shouldShowCol={this.shouldShowCol}
          />

          <Rows.TableRowText
            title="UM TPS"
            dataKey="DoseMonitora"
            data={data.DoseMonitora}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="UM Calculada"
            dataKey="UMcalculada"
            data={data.UMcalculada}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowText
            title="Diff [%]"
            dataKey="DiffUMcalculada"
            data={data.DiffUMcalculada}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowAbsoluteError
            title="Diff [abs]"
            dataKey="DiffAbs"
            data={data}
            colorsObj={colorsObj}
            shouldShowCol={this.shouldShowCol}
          />
          <Rows.TableRowCriterion
            title="Critério"
            dataKey="Criterio"
            data={data}
            shouldShowCol={this.shouldShowCol}
          />
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  data: PropTypes.shape({
    FasesCampos: PropTypes.object,
  }),
};

const mapStateToProps = state => {
  return {
    configs: state.rt_configs
  };
};

const ConnectedTable = connect(
  mapStateToProps,
  null,
  null
)(Table);

export default ConnectedTable;
