import './NumberInput.css';

import React from 'react';
import PropTypes from 'prop-types';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  handleChange = event => {
    const value = event.target.value;
    if(!this.props.controlled)
      this.setState({ value });
    if (this.props.onChange) this.props.onChange(value);
  };

  render() {
    const {
      value,
      controlled,
      onChange,
      className = '',
      ...rest
    } = this.props;
    return (
      <input
        className={`${className} number-input-ohif`}
        type="number"
        value={controlled ? value : this.state.value}
        onChange={this.handleChange}
        {...rest}
      />
    );
  }
}

NumberInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  // If true, Parent most control the value of this component
  controlled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

NumberInput.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  controlled: false,
};

export { NumberInput };
