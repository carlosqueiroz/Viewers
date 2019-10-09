import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import OHIF from '@ohif/core';
import { PatientList, StudyList, Icon } from '@ohif/ui';

import ConnectedHeader from '../connectedComponents/ConnectedHeader.js';
import UserManagerContext from '../UserManagerContext';
import WhiteLabellingContext from '../WhiteLabellingContext';

import ConnectedDicomFilesUploader from '../googleCloud/ConnectedDicomFilesUploader';
import ConnectedDicomStorePicker from '../googleCloud/ConnectedDicomStorePicker';
import filesToStudies from '../lib/filesToStudies.js';
import animatedScrollToElement from '../utils/animatedScrollToElement';

import { RTHeader } from './RTHeader';

const defaultDateFilterNumDays = 25000;
const defaultPatientSearchData = {
  currentPage: 1,
  rowsPerPage: 5,
  dateFrom: moment()
    .subtract(defaultDateFilterNumDays, 'days')
    .toDate(),
  dateTo: new Date(),
  sortData: { field: 'updated_time', order: 'desc' },
};
const defaultStudySearchData = {
  // currentPage: 1,
  // rowsPerPage: 5,
  dateFrom: moment()
    .subtract(defaultDateFilterNumDays, 'days')
    .toDate(),
  dateTo: new Date(),
  sortData: { field: 'StudyDate', order: 'asc' },
};

class StudyListWithData extends Component {
  state = {
    searchData: {},
    studies: [],
    patients: [],
    error: null,
    modalComponentId: null,
    selectedPatient: null,
    selectedStudies: [],
  };

  static propTypes = {
    filters: PropTypes.object,
    patientId: PropTypes.string,
    server: PropTypes.object,
    user: PropTypes.object,
    history: PropTypes.object,
    studyListFunctionsEnabled: PropTypes.bool,
  };

  static defaultProps = {
    studyListFunctionsEnabled: true,
  };

  componentDidMount() {
    // TODO: Avoid using timepoints here
    //const params = { studyInstanceUids, seriesInstanceUids, timepointId, timepointsFilter={} };
    if (!this.props.server && window.config.enableGoogleCloudAdapter) {
      this.setState({
        modalComponentId: 'DicomStorePicker',
      });
    } else {
      this.searchForPatients({
        ...defaultPatientSearchData,
        ...(this.props.filters || {}),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.searchData && !this.state.patients) {
      this.searchForPatients();
    }
    if (this.props.server !== prevProps.server) {
      this.setState({
        modalComponentId: null,
        searchData: null,
        studies: null,
      });
    }
  }

  searchForStudies = (searchData = defaultStudySearchData) => {
    const { server } = this.props;

    let orderby = searchData.sortData ? searchData.sortData.field : undefined;
    if (orderby)
      orderby = (searchData.sortData.order === 'asc' ? '-' : '') + orderby;

    const filter = {
      patientId: this.state.selectedPatient,
      // patientId: searchData.patientId,
      // patientName: searchData.patientName,
      accessionNumber: searchData.accessionNumber,
      studyDescription: searchData.studyDescription,
      modalitiesInStudy: searchData.modalities,
      studyDateFrom: searchData.studyDateFrom,
      studyDateTo: searchData.studyDateTo,
      // limit: searchData.rowsPerPage,
      // offset: (searchData.currentPage-1) * searchData.rowsPerPage,
      orderby,
    };

    // if (server.supportsFuzzyMatching) {
    filter.fuzzymatching = true;
    // }

    const promise = OHIF.studies.searchStudies(server, filter);

    // Render the viewer when the data is ready
    promise
      .then(studies => {
        if (!studies) {
          studies = [];
        }

        studies = studies.map(study => {
          if (!moment(study.studyDate, 'DD/MM/YYYY', true).isValid()) {
            study.studyDate = moment(study.studyDate, 'YYYYMMDD').format(
              'DD/MM/YYYY'
            );
          }
          return study;
        });

        this.setState({ studies }, this.scrollToStudyList);
      })
      .catch(error => {
        this.setState({
          error: true,
        });

        throw new Error(error);
      });
  };

  scrollToStudyList = () => {
    // animatedScrollToElement(document.body || document.documentElement,
    //   document.querySelector(".StudyList"),
    //   1000);
    animatedScrollToElement(document.querySelector('.StudyList'));
  };

  searchForPatients = (searchData = defaultPatientSearchData) => {
    const filter = {
      PatientID: searchData.PatientID,
      PatientName: searchData.PatientName,
      NumStudies: searchData.NumStudies,
      updated_time: searchData.updated_time,
      patientDateFrom: moment(searchData.dateFrom).toISOString(),
      patientDateTo: moment(searchData.dateTo).toISOString(),
      limit: searchData.rowsPerPage,
      page: searchData.currentPage,
      sort: searchData.sortData,
    };

    const promise = axios.get(
      `https://${window.location.hostname}/api/viewer/pacs/patients`,
      { params: filter }
    );

    promise
      .then(({ data: patients }) => {
        if (!patients) {
          patients = [];
        }

        patients = patients.map(patient => {
          if (!moment(patient.updated_time, 'DD/MM/YYYY', true).isValid()) {
            patient.updated_time = moment(
              patient.updated_time,
              'YYYYMMDD'
            ).format('DD/MM/YYYY');
          }
          return patient;
        });

        this.setState({
          patients,
        });
      })
      .catch(error => {
        this.setState({
          error: true,
        });

        throw new Error(error);
      });
  };

  onImport = () => {
    this.openModal('DicomFilesUploader');
  };

  openModal = modalComponentId => {
    this.setState({
      modalComponentId,
    });
  };

  closeModal = () => {
    this.setState({ modalComponentId: null });
  };

  onSelectStudy = (studyInstanceUID, checked) => {
    if (checked)
      this.setState(prev => ({
        selectedStudies: [...prev.selectedStudies, studyInstanceUID],
      }));
    else
      this.setState(prev => ({
        selectedStudies: prev.selectedStudies.filter(
          uid => uid !== studyInstanceUID
        ),
      }));

    // this.props.history.push(`/viewer/${studyInstanceUID}`);
  };

  onSelectPatient = PatientID => {
    if (this.state.selectedPatient === PatientID)
      this.setState({
        selectedPatient: null,
        studies: [],
      });
    else {
      this.setState(
        {
          selectedPatient: PatientID,
        },
        this.searchForStudies
      );
    }
  };

  onSearchPatient = searchData => {
    // this.setState({ selectedStudies: [] });
    // this.searchForStudies(searchData);
    this.setState({ selectedPatient: null });
    this.searchForPatients(searchData);
  };

  onSearchStudy = searchData => {
    this.setState({ selectedStudies: [] });
    this.searchForStudies(searchData);
  };

  closeModals = () => {
    this.setState({
      modalComponentId: null,
    });
  };

  onFloatingBtnClick = () => {
    const uids = this.state.selectedStudies.join(';');
    this.props.history.push(`/viewer/${uids}`);
  };

  renderFloatingButton = () => {
    if (!this.state.selectedStudies.length) return null;

    const styles = {
      bottom: '30px',
      right: '30px',
      position: 'fixed',
      zIndex: '1000',
      display: 'block',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      fontSize: '25px',
      lineHeight: '41px',
      color: 'white',
    };
    return (
      <button
        className="btn btn-lg btn-primary"
        onClick={this.onFloatingBtnClick}
        style={styles}
        title={this.props.t('OpenStudies')}
      >
        <Icon name="RT_Send_Report_PACS" />
      </button>
    );
  };

  render() {
    const onDrop = async acceptedFiles => {
      try {
        const studies = await filesToStudies(acceptedFiles);

        this.setState({ studies });
      } catch (error) {
        this.setState({ error });
      }
    };

    if (this.state.error) {
      return <div>Error: {JSON.stringify(this.state.error)}</div>;
    } else if (this.state.studies === null && !this.state.modalComponentId) {
      return <div>Loading...</div>;
    }

    let healthCareApiButtons = null;
    let healthCareApiWindows = null;

    // TODO: This should probably be a prop
    if (window.config.enableGoogleCloudAdapter) {
      healthCareApiWindows = (
        <ConnectedDicomStorePicker
          isOpen={this.state.modalComponentId === 'DicomStorePicker'}
          onClose={this.closeModals}
        />
      );

      healthCareApiButtons = (
        <div
          className="form-inline btn-group pull-right"
          style={{ padding: '20px' }}
        >
          <button
            className="btn btn-primary"
            onClick={() => this.openModal('DicomStorePicker')}
          >
            {this.props.t('Change DICOM Store')}
          </button>
        </div>
      );
    }

    const patientList = (
      <div className="paginationArea">
        {this.state.patients ? (
          <PatientList
            patients={this.state.patients}
            onSelectItem={this.onSelectPatient}
            pageSize={defaultPatientSearchData.rowsPerPage}
            defaultSort={defaultPatientSearchData.sortData}
            patientListDateFilterNumDays={defaultDateFilterNumDays}
            onSearch={this.onSearchPatient}
          >
            {this.props.studyListFunctionsEnabled ? (
              <ConnectedDicomFilesUploader
                isOpen={this.state.modalComponentId === 'DicomFilesUploader'}
                onClose={this.closeModals}
              />
            ) : null}
            {healthCareApiButtons}
            {healthCareApiWindows}
          </PatientList>
        ) : (
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={'drag-drop-instructions'}>
                <h3>
                  {this.props.t(
                    'Drag and Drop DICOM files here to load them in the Viewer'
                  )}
                </h3>
                <h4>
                  {this.props.t("Or click to load the browser's file selector")}
                </h4>
                <input {...getInputProps()} style={{ display: 'none' }} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    );

    const studyList = (
      <div className="paginationArea">
        {this.state.studies ? (
          <StudyList
            studies={this.state.studies}
            studyListFunctionsEnabled={this.props.studyListFunctionsEnabled}
            onImport={this.onImport}
            onSelectItem={this.onSelectStudy}
            pageSize={defaultStudySearchData.rowsPerPage}
            defaultSort={defaultStudySearchData.sortData}
            studyListDateFilterNumDays={defaultDateFilterNumDays}
            onSearch={this.onSearchStudy}
            selectedStudies={this.state.selectedStudies}
          />
        ) : null}
      </div>
    );
    return (
      <>
        {/* <WhiteLabellingContext.Consumer>
          {whiteLabelling => (
            <UserManagerContext.Consumer>
              {userManager => (
                <ConnectedHeader
                  home={true}
                  user={this.props.user}
                  userManager={userManager}
                >
                  {whiteLabelling.logoComponent}
                </ConnectedHeader>
              )}
            </UserManagerContext.Consumer>
          )}
        </WhiteLabellingContext.Consumer> */}
        <RTHeader />
        {patientList}
        {studyList}
        {this.renderFloatingButton()}
      </>
    );
  }
}

export default withRouter(withTranslation('Common')(StudyListWithData));
