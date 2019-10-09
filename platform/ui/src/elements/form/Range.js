import './Range.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  handleChange = event => {
    const value = event.target.value;
    if (!this.props.controlled) this.setState({ value });
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
        type="range"
        value={controlled ? value : this.state.value}
        onChange={this.handleChange}
        className={`${className} range`}
        {...rest}
      />
    );
  }
}

Range.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // If true, Parent most control the value of this component
  controlled: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

Range.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  controlled: false,
};

export { Range };
