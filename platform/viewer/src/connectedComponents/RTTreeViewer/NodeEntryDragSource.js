import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import NodeEntry from './NodeEntry';
import DragPreview from './DragPreview';

// Drag sources and drop targets only interact
// if they have the same string type.
const Types = {
  THUMBNAIL: 'thumbnail',
};

const nodeSource = {
  // canDrag(props) {
  //   console.log('canDrag');
  //   return props.error === false;
  // },

  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor) {
    document.body.classList.remove('react-dnd-dragging');

    //const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    // document.body.classList.remove('dragging');

    if (dropResult) {
      //console.log(`You dropped ${item.id} into ${dropResult.id}!`);
      //console.log(item);
    }
  },

  // isDragging(props, monitor) {
  //   console.log('isDragging');
  //   return props.id === monitor.getItem().id;
  // },
};

class NodeEntryDragSource extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isDragging: false,
  };

  render() {
    const { connectDragSource } = this.props;
    const dropEffect = 'copy';

    return connectDragSource(
      <span className="RTTreeViewer_NodeEntryContainer">
        <DragPreview {...this.props} />
        <NodeEntry {...this.props} />
      </span>,
      { dropEffect }
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(Types.THUMBNAIL, nodeSource, collect)(
  NodeEntryDragSource
);
