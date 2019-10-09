import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatasetSelector from './DatasetSelector';
import './googleCloud.css';
import { withTranslation } from 'react-i18next';

import { Modal } from '@ohif/ui';
// import Modal from 'react-responsive-modal';
// import Modal from 'react-bootstrap-modal';

class DicomStorePickerModal extends Component {
  static propTypes = {
    url: PropTypes.string,
    user: PropTypes.object.isRequired,
    setServers: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
  };

  handleEvent = data => {
    const servers = [
      {
        name: data.dicomStore,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        qidoSupportsIncludeField: false,
        type: 'dicomWeb',
        qidoRoot: data.qidoRoot,
        wadoRoot: data.wadoRoot,
        wadoUriRoot: data.wadoUriRoot,
        active: true,
        supportsFuzzyMatching: false,
      },
    ];

    this.props.setServers(servers);
  };

  render() {
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
      //       {this.props.t('Google Cloud Healthcare API')}
      //     </Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <DatasetSelector
      //       setServers={this.handleEvent}
      //       user={this.props.user}
      //       url={this.props.url}
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
          <Modal.Title>{this.props.t('Google Cloud Healthcare API')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatasetSelector
            setServers={this.handleEvent}
            user={this.props.user}
            url={this.props.url}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withTranslation('Common')(DicomStorePickerModal);
