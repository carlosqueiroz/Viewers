import React from 'react';
import PropTypes from 'prop-types';
import cornerstone from 'cornerstone-core';
import debounce from 'lodash.debounce';
import { RangeInput } from '@ohif/ui';

import { getActiveViewportData } from '../../../store/layout/selectors.js';

import './style.css';

const noop = () => {};

class FusionOpacity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      leftValue: 50,
      rightValue: 50,
    };

    this.delayedOnChange = debounce(props.onChange, 250);
  }

  componentDidMount() {
    const state = window.store.getState();
    const enabledElement = getActiveViewportData(state).dom;
    if(enabledElement) {
      const layers = cornerstone.getLayers(enabledElement);
      if(layers && layers.length === 2) {
        const leftValue = Math.floor(layers[0].options.opacity * 100);
        const rightValue = Math.floor(layers[1].options.opacity * 100);
        const value = (rightValue - leftValue) / 2;

        const state = {
          value,
          leftValue,
          rightValue,
        };

        this.setState(state);
      }
    }
  }

  onChange = value => {
    const state = {
      value,
      leftValue: Math.floor(50 - value),
      rightValue: Math.floor(50 + (+value)),
    };
    this.setState(state);
    this.delayedOnChange({ ...state }, this.props);
  };

  render() {
    const { value, leftValue, rightValue } = this.state;
    const { leftLabel, rightLabel } = this.props;
    return (
      <div className="FusionOpacity">
        <div className="FusionOpacity__info">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
        <div className="FusionOpacity__input">
          <span>{leftValue}%</span>
          <RangeInput
            value={value}
            min={-50}
            max={50}
            onChange={this.onChange}
            style={{ width: '70%' }}
          />
          <span>{rightValue}%</span>
        </div>
      </div>
    );
  }
}

FusionOpacity.propTypes = {
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onChange: PropTypes.func,
};

FusionOpacity.defaultProps = {
  leftLabel: 'CR',
  rightLabel: 'DRR',
  onChange: noop,
};

export default FusionOpacity;