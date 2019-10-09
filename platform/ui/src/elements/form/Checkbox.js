import './Checkbox.css';

import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  handleChange = event => {
    const { checked } = event.target;
    this.setState({ checked });
    if (this.props.onChange) this.props.onChange(checked);
  };

  render() {
    return (
      <label className="checkbox-ohif">
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleChange}
          id={this.props.id}
        />
        <div className="checkmark" />
      </label>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

export { Checkbox };
