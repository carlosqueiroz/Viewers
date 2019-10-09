import React from 'react';
import PropTypes from 'prop-types';
import cornerstone from 'cornerstone-core';
import { SelectInput } from '@ohif/ui';

import { getActiveViewportData } from '../../../store/layout/selectors';
import getFusionColormaps from '../../../utils/getFusionColormaps';

import './style.css';

const noop = () => {};

class FusionColorMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      options: []
    };
  }

  componentDidMount() {
    const options = getFusionColormaps()

    let value = this.state.value;
    const state = window.store.getState();
    const enabledElement = getActiveViewportData(state).dom;
    if (enabledElement) {
      const layers = cornerstone.getLayers(enabledElement);
      if (layers && layers.length === 2) {
        value = layers[1].viewport.colormap;
      }
    }
    this.setState({ value, options });
  }

  onChange = value => {
    this.setState({ value });
    this.props.onChange({ value }, this.props);
  };

  render() {
    const { value, options } = this.state;
    return (
      <div className="FusionColorMap">
        <div className="FusionColorMap__input">
          <SelectInput
            value={value}
            options={options}
            onChange={this.onChange}
            controlled={true}
            style={{minWidth: '100px'}}
          />
        </div>
      </div>
    );
  }
}

FusionColorMap.propTypes = {
  onChange: PropTypes.func,
};

FusionColorMap.defaultProps = {
  onChange: noop,
};

export default FusionColorMap;
