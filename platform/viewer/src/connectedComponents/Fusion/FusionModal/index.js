import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Modal from 'react-bootstrap-modal';
// import Modal from 'react-responsive-modal';
import { ThumbnailEntry, Modal } from '@ohif/ui';

import forEach from 'lodash.foreach';
import moment from 'moment';

import { utils } from '@ohif/core';

import './styles.css';

const FUSION_MODALITIES = /mr|cr/i;

class FusionModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
    onActive: PropTypes.func,
  };

  state = {
    displayData: [],
    fusionData: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen) {
      const displayData = [];

      // TODO: Pegar isso via connect? Mas não tem Selectors no core/reducers...
      // const { viewports } = window.store.getState();
      // const {
      //   displaySetInstanceUid: currentDSUid,
      // } = viewports.viewportSpecificData[viewports.activeViewportIndex];

      const { studyMetadataManager } = utils;
      const studies = studyMetadataManager.all();
      forEach(studies, study => {
        const displaySets = study.getDisplaySets();
        const data = {
          studyInstanceUid: study.getDataProperty('studyInstanceUid'),
          studyDescription: study.getDataProperty('studyDescription'),
          studyDate: study.getDataProperty('studyDate'),
          thumbnails: [],
        };

        forEach(displaySets, ds => {
          if (
            // ds.displaySetInstanceUid !== currentDSUid &&
            FUSION_MODALITIES.test(ds.modality)
          ) {
            const {
              displaySetInstanceUid,
              seriesDescription,
              seriesInstanceUid,
            } = ds;
            let imageId, altImageText;

            if (ds.images && ds.images.length) {
              const imageIndex = Math.floor(ds.images.length / 2);

              imageId = ds.images[imageIndex].getImageId();
            } else {
              altImageText = ds.modality;
            }

            data.thumbnails.push({
              imageId,
              altImageText,
              displaySetInstanceUid,
              seriesDescription,
              seriesInstanceUid,
            });
          }
        });

        if (data.thumbnails.length) displayData.push(data);
      });
      console.log('displayData', displayData);
      this.setState({ displayData, fusionData: [] });
    }
  }

  parseDate = studyDate => {
    let ret = '';
    if (!moment(studyDate, 'MMM DD, YYYY', true).isValid()) {
      ret = moment(studyDate, 'YYYYMMDD').format('MMM DD, YYYY');
    }
    return ret;
  };

  getClickHandler = (ds, thumb) => {
    return () => {
      const { studyInstanceUid } = ds;
      const { seriesInstanceUid, displaySetInstanceUid } = thumb;

      console.log(
        'Fusion!',
        studyInstanceUid,
        seriesInstanceUid,
        displaySetInstanceUid
      );

      // if (this.props.onHide) this.props.onHide();
      this.setState(prevState => ({
        fusionData: [
          ...prevState.fusionData,
          { studyInstanceUid, displaySetInstanceUid },
        ],
      }));
    };
  };

  onCancelClick = () => {
    if (this.props.onHide) this.props.onHide();
  };

  renderData = (ds, index) => {
    const disabled = this.state.fusionData.length === 4;
    return (
      <React.Fragment key={ds.studyInstanceUid}>
        <div className="table-header">
          <span>{ds.studyDescription}</span>
          <span>{this.parseDate(ds.studyDate)}</span>
        </div>
        {ds.thumbnails.map((thumb, j) => {
          return (
            <div className="table-row" key={`tr_${index}_${j}`}>
              <ThumbnailEntry
                imageId={thumb.imageId}
                showDetails={false}
                id={`thumb_${index}_${j}`}
              />
              <div className="table-row-description">
                Descrição: {thumb.seriesDescription} <br />
                <button
                  className="btn btn-primary"
                  onClick={this.getClickHandler(ds, thumb)}
                  disabled={disabled ? 'disabled' : null}
                >
                  Selecionar
                </button>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  getDisplaySet = ({ studyInstanceUid, displaySetInstanceUid }) => {
    const { studyMetadataManager } = utils;
    const study = studyMetadataManager.get(studyInstanceUid);
    const displaySets = study.getDisplaySets();

    return displaySets.find(displaySet => {
      return displaySet.displaySetInstanceUid === displaySetInstanceUid;
    });
  };

  onActive = () => {
    const ret = [];
    forEach(this.state.fusionData, d => {
      const displaySet = this.getDisplaySet(d);
      ret.push(displaySet);
    });

    if (ret.length && this.props.onActive) this.props.onActive(ret, this.props);
    if (this.props.onHide) this.props.onHide();
  };

  render() {
    return (
      // <Modal
      //   show={this.props.isOpen}
      //   onHide={this.props.onHide}
      //   aria-labelledby="ModalHeader"
      //   className="modal fade themed in fusion-modal"
      //   backdrop={true}
      //   size={'md'}
      //   keyboard={true}
      // >
      //   <Modal.Header closeButton>
      //     <Modal.Title>Fusão</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      //     <div className="table-wrapper">
      //       {this.state.displayData.map((ds, i) => this.renderData(ds, i))}
      //     </div>
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
      //     <button className="btn btn-primary" onClick={this.onActive}>
      //       Fundir
      //     </button>
      //   </Modal.Footer>
      // </Modal>

      // <Modal
      //   open={this.props.isOpen}
      //   onClose={this.props.onHide}
      //   ariaLabelledby="ModalHeader"
      //   classNames={{ modal: 'viewer-modal fusion-modal', closeButton: 'close-button' }}
      //   center
      // >
      //   <div className="viewer-modal-header">
      //     <h4 className="viewer-modal-title">Fusão</h4>
      //   </div>
      //   <div className="viewer-modal-body">
      //     <div className="table-wrapper">
      //       {this.state.displayData.map((ds, i) => this.renderData(ds, i))}
      //     </div>
      //   </div>
      //   <div className="viewer-modal-footer">
      //     <button
      //       type="button"
      //       className="btn btn-default"
      //       onClick={this.onCancelClick}
      //     >
      //       Cancel
      //     </button>
      //     <button
      //       type="button"
      //       className="btn btn-primary"
      //       onClick={this.onActive}
      //     >
      //       Fundir
      //     </button>
      //   </div>
      // </Modal>

      <Modal
        open={this.props.isOpen}
        onClose={this.props.onHide}
        ariaLabelledby="ModalHeader"
        classNames={{
          modal: 'viewer-modal fusion-modal',
          closeButton: 'close-button',
        }}
        center
      >
        <Modal.Header>
          <Modal.Title>Fusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-wrapper">
            {this.state.displayData.map((ds, i) => this.renderData(ds, i))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.onCancelClick}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onActive}
          >
            Fundir
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FusionModal;
