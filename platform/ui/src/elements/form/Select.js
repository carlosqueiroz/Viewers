import './Select.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
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
      options,
      ...rest
    } = this.props;

    return (
      <select
        className={`${className} select-ohif`}
        value={controlled ? value : this.state.value}
        onChange={this.handleChange}
        {...rest}
      >
        {this.props.options.map(({ key, value }) => {
          return (
            <option key={key} value={value}>
              {key}
            </option>
          );
        })}
      </select>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  // If true, Parent most control the value of this component
  controlled: PropTypes.bool,
  value: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  value: null,
  controlled: false,
};

export { Select };
