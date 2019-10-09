import './UserPreferencesModal.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '../../utils/LanguageProvider';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import { UserPreferences } from './UserPreferences';

import { Modal } from '../modal';
// import Modal from 'react-responsive-modal';

// import Modal from 'react-bootstrap-modal';
// import 'react-bootstrap-modal/lib/css/rbm-patch.css';
// // TODO: Is this the only component importing these?
// import './../../design/styles/common/modal.styl';

class UserPreferencesModal extends Component {
  // TODO: Make this component more generic to allow things other than W/L and hotkeys...
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onResetToDefaults: PropTypes.func,
    windowLevelData: PropTypes.object,
    hotKeysData: PropTypes.object,
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      windowLevelData: cloneDeep(props.windowLevelData),
      hotKeysData: cloneDeep(props.hotKeysData),
    };
  }

  static defaultProps = {
    isOpen: false,
    onCancel: () => {},
  };

  save = () => {
    this.props.onSave({
      windowLevelData: this.state.windowLevelData,
      hotKeysData: this.state.hotKeysData,
    });
  };

  componentDidUpdate(prev, next) {
    const newStateData = {};

    if (!isEqual(prev.windowLevelData, next.windowLevelData)) {
      newStateData.windowLevelData = prev.windowLevelData;
    }

    if (!isEqual(prev.hotKeysData, next.hotKeysData)) {
      newStateData.hotKeysData = prev.hotKeysData;
    }

    if (newStateData.hotKeysData || newStateData.windowLevelData) {
      this.setState(newStateData);
    }
  }

  render() {
    return (
      // <Modal
      //   show={this.props.isOpen}
      //   onHide={this.props.onCancel}
      //   aria-labelledby="ModalHeader"
      //   className="ModalHeader modal fade themed in"
      //   backdrop={false}
      //   large={true}
      //   keyboard={false}
      // >
      //   <Modal.Header closeButton>
      //     <Modal.Title>{this.props.t('User Preferences')}</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <UserPreferences
      //       windowLevelData={this.state.windowLevelData}
      //       hotKeysData={this.state.hotKeysData}
      //     />
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <button
      //       className="btn btn-danger pull-left"
      //       onClick={this.props.onResetToDefaults}
      //     >
      //       {this.props.t('Reset to Defaults')}
      //     </button>
      //     <Modal.Dismiss className="btn btn-default">
      //       {this.props.t('Cancel')}
      //     </Modal.Dismiss>
      //     <button className="btn btn-primary" onClick={this.save}>
      //       {this.props.t('Save')}
      //     </button>
      //   </Modal.Footer>
      // </Modal>

      <Modal
        open={this.props.isOpen}
        onClose={this.props.onCancel}
        ariaLabelledby="ModalHeader"
        classNames={{
          modal: 'viewer-modal ModalHeader',
          closeButton: 'close-button',
        }}
        center
      >
        <Modal.Header>
          <Modal.Title>{this.props.t('User Preferences')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserPreferences
            windowLevelData={this.state.windowLevelData}
            hotKeysData={this.state.hotKeysData}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger pull-left"
            type="button"
            onClick={this.props.onResetToDefaults}
          >
            {this.props.t('Reset to Defaults')}
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.onCancel}
          >
            {this.props.t('Cancel')}
          </button>
          <button type="button" className="btn btn-primary" onClick={this.save}>
            {this.props.t('Save')}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const connectedComponent = withTranslation('UserPreferencesModal')(
  UserPreferencesModal
);
export { connectedComponent as UserPreferencesModal };
export default connectedComponent;
