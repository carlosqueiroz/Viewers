import React from 'react';
import ReactDOM from 'react-dom';

const overlayRoot = document.getElementById('graph-overlay-root');

class GraphOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    overlayRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    overlayRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default GraphOverlay;
