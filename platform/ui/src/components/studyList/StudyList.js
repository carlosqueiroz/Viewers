import './StudyList.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from './../../elements/form';
import { withTranslation } from '../../utils/LanguageProvider';
import { Table, INPUT_TYPES } from '../table';
import { StudylistToolbar } from './StudyListToolbar.js';

class StudyList extends Component {
  static propTypes = {
    studies: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
    studyListDateFilterNumDays: PropTypes.number,
    studyListFunctionsEnabled: PropTypes.bool,
    defaultSort: PropTypes.shape({
      field: PropTypes.string.isRequired,
      order: PropTypes.oneOf(['desc', 'asc']).isRequired,
    }),
    onImport: PropTypes.func,
    pageOptions: PropTypes.array,
    selectedStudies: PropTypes.array.isRequired,
  };

  static defaultProps = {
    studyListDateFilterNumDays: 7,
  };

  renderHeader = renderCell => {
    const tableMeta = [
      {
        field: 'checkboxSelect',
        inputType: INPUT_TYPES.NONE,
      },
      {
        field: 'AccessionNumber',
        title: this.props.t('AccessionNumber'),
      },
      {
        field: 'StudyDate',
        title: this.props.t('StudyDate'),
        inputType: INPUT_TYPES.DATE_RANGE,
      },
      {
        field: 'Modalities',
        title: this.props.t('Modality'),
      },
      {
        field: 'StudyDescription',
        title: this.props.t('StudyDescription'),
      },
    ];

    return tableMeta.map(meta => renderCell(meta));
  };

  getCheckboxChangeHandler(studyInstanceUid) {
    return checked => {
      this.props.onSelectItem(studyInstanceUid, checked);
    };
  }

  renderBody = TableRow => {
    return this.props.studies.map(study => (
      <TableRow key={study.studyInstanceUid} id={study.studyInstanceUid}>
        <td className="emptyCell">
          <Checkbox
            onChange={this.getCheckboxChangeHandler(study.studyInstanceUid)}
            checked={this.props.selectedStudies.includes(
              study.studyInstanceUid
            )}
          />
        </td>

        <td className="accessionNumber">{study.accessionNumber}</td>
        <td className="studyDate">{study.studyDate}</td>
        <td className="modalities">{study.modalities}</td>
        <td className="studyDescription">{study.studyDescription}</td>
      </TableRow>
    ));
  };

  render() {
    const {
      studies,
      onImport,
      className,
      t,
      studyListDateFilterNumDays,
      studyListFunctionsEnabled,
      children,
      ...rest
    } = this.props;

    return (
      <div className="StudyList">
        <div className="studyListToolbar clearfix">
          <div className="header pull-left">{t('StudyList')}</div>
          <div className="studyCount pull-right">{studies.length}</div>
          <div className="pull-right">
            {studyListFunctionsEnabled ? (
              <StudylistToolbar onImport={onImport} />
            ) : null}
          </div>
          {children}
        </div>
        {/* <div className="theadBackground" /> */}
        <div id="studyListContainer">
          <Table
            data={studies}
            renderHeader={this.renderHeader}
            renderBody={this.renderBody}
            className="studylistResult"
            dateFilterNumDays={studyListDateFilterNumDays}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

const connectedComponent = withTranslation('StudyList')(StudyList);
export { connectedComponent as StudyList };
