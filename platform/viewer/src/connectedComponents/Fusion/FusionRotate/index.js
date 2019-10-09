import React from 'react';
import PropTypes from 'prop-types';
import cornerstone from 'cornerstone-core';
import debounce from 'lodash.debounce';
import { NumberInput, RangeInput } from '@ohif/ui';

import { getActiveViewportData } from '../../../store/layout/selectors.js';

import './style.css';

const noop = () => {};

class FusionRotate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.delayedOnChange = debounce(props.onChange, 250);
  }

  componentDidMount() {
    const state = window.store.getState();
    const enabledElement = getActiveViewportData(state).dom;
    if (enabledElement) {
      const layers = cornerstone.getLayers(enabledElement);
      if (layers && layers.length === 2) {
        const value = layers[1].viewport.rotation;
        this.setState({ value });
      }
    }
  }

  onChange = value => {
    this.setState({ value });
    this.delayedOnChange({ value }, this.props);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="FusionRotate">
        <div className="FusionRotate__input">
          <RangeInput
            value={value}
            min={-360}
            max={360}
            onChange={this.onChange}
            style={{ width: '55%' }}
            controlled={true}
          />
          <NumberInput
            value={value}
            min={-360}
            max={360}
            step={1}
            onChange={this.onChange}
            style={{ width: '40%' }}
            controlled={true}
          />
        </div>
      </div>
    );
  }
}

FusionRotate.propTypes = {
  onChange: PropTypes.func,
};

FusionRotate.defaultProps = {
  onChange: noop,
};

export default FusionRotate;
