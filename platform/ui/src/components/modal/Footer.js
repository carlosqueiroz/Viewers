import React from 'react';

class Footer extends React.Component {
  render() {
    const { className = '', children, ...rest } = this.props;
    return (
      <div className={`viewer-modal-footer ${className}`} {...rest}>
        {children}
      </div>
    );
  }
}

export { Footer };
