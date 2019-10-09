import React from 'react';

class Header extends React.Component {
  render() {
    const { className = '', children, ...rest } = this.props;
    return (
      <div className={`viewer-modal-header ${className}`} {...rest}>
        {children}
      </div>
    );
  }
}

export { Header };
