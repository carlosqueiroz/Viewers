import React from 'react';

class Title extends React.Component {
  render() {
    const { className = '', children, ...rest } = this.props;
    return (
      <h4 className={`viewer-modal-title ${className}`} {...rest}>
        {children}
      </h4>
    );
  }
}

export { Title };
