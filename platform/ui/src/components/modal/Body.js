import React from 'react';

class Body extends React.Component {
  render() {
    const { className = '', children, ...rest } = this.props;
    return (
      <div className={`viewer-modal-body ${className}`} {...rest}>
        {children}
      </div>
    );
  }
}

export { Body };
