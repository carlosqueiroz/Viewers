import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DicomUploader from './DicomUploader';
import { withTranslation } from 'react-i18next';

import { Modal } from '@ohif/ui';
// import Modal from 'react-responsive-modal';
// import Modal from 'react-bootstrap-modal';

class DicomFileUploaderModal extends Component {
  static propTypes = {
    url: PropTypes.string,
    retrieveAuthHeaderFunction: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = {
    uploaded: false,
  };

  render() {
    if (!this.props.url) {
      return null;
    }

    return (
      // <Modal
      //   show={this.props.isOpen}
      //   onHide={this.props.onClose}
      //   aria-labelledby="ModalHeader"
      //   className="modal fade themed in"
      //   backdrop={false}
      //   size={'md'}
      //   keyboard={true}
      // >
      //   <Modal.Header closeButton>
      //     <Modal.Title>
      //       {this.props.t('Upload DICOM Files')}
      //     </Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <DicomUploader
      //       url={this.props.url}
      //       retrieveAuthHeaderFunction={this.props.retrieveAuthHeaderFunction}
      //     />
      //   </Modal.Body>
      // </Modal>

      <Modal
        open={this.props.isOpen}
        onClose={this.props.onClose}
        ariaLabelledby="ModalHeader"
        classNames={{ modal: 'viewer-modal', closeButton: 'close-button' }}
        center
      >
        <Modal.Header>
          <Modal.Title>{this.props.t('Upload DICOM Files')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DicomUploader
            url={this.props.url}
            retrieveAuthHeaderFunction={this.props.retrieveAuthHeaderFunction}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withTranslation('Common')(DicomFileUploaderModal);
