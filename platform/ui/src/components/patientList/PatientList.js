import './PatientList.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '../../utils/LanguageProvider';

import { Table } from '../table';

class PatientList extends Component {
  static propTypes = {
    patients: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
    patientListDateFilterNumDays: PropTypes.number,
    defaultSort: PropTypes.shape({
      field: PropTypes.string.isRequired,
      order: PropTypes.oneOf(['desc', 'asc']).isRequired,
    }),
    onImport: PropTypes.func,
    pageOptions: PropTypes.array,
  };

  static defaultProps = {
    currentPage: 1,
    rowsPerPage: 5,
    patientListDateFilterNumDays: 7,
  };

  renderHeader = renderCell => {
    const tableMeta = [
      {
        field: 'PatientName',
        title: this.props.t('PatientName'),
      },
      {
        field: 'PatientID',
        title: this.props.t('MRN'),
      },
      {
        field: 'NumStudies',
        title: this.props.t('NumStudies'),
      },
      {
        field: 'updated_time',
        title: this.props.t('UpdatedTime'),
        inputType: 'date-range',
      },
    ];

    return tableMeta.map(meta => renderCell(meta));
  };

  renderBody = TableRow => {
    return this.props.patients.map(patient => (
      <TableRow key={patient.PatientID} id={patient.PatientID}>
        <td className={patient.PatientName ? 'patientName' : 'emptyCell'}>
          {patient.PatientName || `(${this.props.t('Empty')})`}
        </td>

        <td className="patientId">{patient.PatientID}</td>
        <td className="numStudies">{patient.NumStudies}</td>
        <td className="patientUpdatedTime">{patient.updated_time}</td>
      </TableRow>
    ));
  };

  render() {
    const {
      patients,
      onImport,
      className,
      t,
      patientListDateFilterNumDays,
      ...rest
    } = this.props;

    return (
      <div className="PatientList">
        <div className="patientListToolbar clearfix">
          <div className="header pull-left">{this.props.t('PatientList')}</div>
          <div className="patientCount pull-right">
            {this.props.patients.length}
          </div>
          {this.props.children}
        </div>
        {/* <div className="theadBackground" /> */}
        <div id="patientListContainer">
          <Table
            data={this.props.patients}
            renderHeader={this.renderHeader}
            renderBody={this.renderBody}
            className="patientlistResult"
            dateFilterNumDays={patientListDateFilterNumDays}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

const connectedComponent = withTranslation('PatientList')(PatientList);
export { connectedComponent as PatientList };
