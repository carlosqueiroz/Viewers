import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import forEach from 'lodash.foreach';

import { MODALITIES } from '../../constants';

import rtDataActions from '../../store/rt_data/actions';
import { makeGetFichaData } from '../../store/rt_data/reducers';

import './RTPlanViewer.css';
import ficha_test from './ficha_test.json';

import Table from './Table';

class RTPlanViewer extends Component {
  // Melhor usar cache local até implementar a parte de salvar os dados no BD do servidor,
  // se não vai lotar o server com arquivos em public/uploads/viewer ...
  USE_CACHE = false;

  constructor(props) {
    super(props);

    this.state = {
      ficha_data: null,
      error: null,
    };
  }

  componentDidMount() {
    if (this.USE_CACHE) {
      console.log(
        'ficha_data (CACHE)',
        ficha_test,
        'time',
        new Date().getTime()
      );
      this.setState({
        ficha_data: ficha_test,
        error: null,
      });
    } else if (!this.props.ficha_data) this.fetchFichaData();
    else if (this.props.ficha_data) {
      console.log(
        'ficha_data (didMount)',
        this.props.ficha_data,
        'time',
        new Date().getTime()
      );
      this.setState({
        ficha_data: this.props.ficha_data,
        error: null,
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.ficha_data !== this.props.ficha_data) {
      console.log(
        'ficha_data (didUpdate)',
        this.props.ficha_data,
        'time',
        new Date().getTime()
      );
      this.setState({
        ficha_data: this.props.ficha_data,
        error: null,
      });
    }
  };

  onError = err => {
    if (err.response) console.error(err.response.data);
    else console.error(err);
    this.setState({
      error: 'Ocorreu um erro...',
    });
  };

  fetchFichaData = () => {
    const { displaySet } = this.props.viewportData;
    const {
      studyInstanceUid,
      seriesInstanceUid,
      // sopInstanceUid,
      dicomWebClient,
    } = displaySet;

    return this.props
      .fetchFichaData(studyInstanceUid, {
        studyInstanceUid,
        seriesInstanceUids: [seriesInstanceUid],
      })
      .catch(this.onError);
  };

  render() {
    if (this.state.error)
      return <div className="ErrorContainer">{this.state.error}</div>;
    if (!this.state.ficha_data)
      return <div className="LoadingContainer">Carregando...</div>;

    return (
      <div className="RTPlanViewer">
        <Table data={this.state.ficha_data} />
      </div>
    );
  }
}

RTPlanViewer.propTypes = {
  viewportData: PropTypes.shape({
    displaySet: PropTypes.shape({
      seriesInstanceUid: PropTypes.string,
      sopInstanceUid: PropTypes.string,
      studyInstanceUid: PropTypes.string,
      dicomWebClient: PropTypes.shape({
        wadoURL: PropTypes.string,
      }),
    }),
  }),
};

const makeMapStateToProps = () => {
  const getFichaData = makeGetFichaData();
  return (state, ownProps) => {
    const { studyInstanceUid } = ownProps.viewportData.displaySet;
    return {
      ficha_data: getFichaData(state, studyInstanceUid).data,
    };
  };
};

const ConnectedRTPlanViewer = connect(
  makeMapStateToProps,
  {
    fetchFichaData: rtDataActions.fetchFichaData,
  },
  null
)(RTPlanViewer);

export default ConnectedRTPlanViewer;
