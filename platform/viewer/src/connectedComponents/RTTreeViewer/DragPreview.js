import React, { PureComponent, memo } from 'react';
import { DragLayer } from 'react-dnd';
import PropTypes from 'prop-types';

import NodeEntry from './NodeEntry';

let subscribedToOffsetChange = false;
let dragPreviewRef = null;

const collector = monitor => {
  if (!subscribedToOffsetChange) {
    monitor.subscribeToOffsetChange(onOffsetChange(monitor));
    subscribedToOffsetChange = true;
  }

  if (dragPreviewRef) {
    const offset =
      monitor.getSourceClientOffset() || monitor.getInitialSourceClientOffset();

    if (offset) {
      const transform = `translate(${offset.x}px, ${offset.y}px)`;
      dragPreviewRef.style['transform'] = transform;
      dragPreviewRef.style['-webkit-transform'] = transform;
    }
  }

  if (monitor.isDragging() && !document.body.classList.contains('react-dnd-dragging'))
    document.body.classList.add('react-dnd-dragging');

  const item = monitor.getItem();
  let newItem = {};
  if (item) {
    newItem = {
      id: item.displaySetInstanceUid,
      active: item.active,
      studyInstanceUid: item.studyInstanceUid,
      displaySetInstanceUid: item.displaySetInstanceUid,
      label: item.label,
    };
  }

  return {
    ...newItem,
    isDragging: monitor.isDragging(),
  };
};

const onOffsetChange = monitor => () => {
  if (!dragPreviewRef) return;

  const offset =
    monitor.getSourceClientOffset() || monitor.getInitialSourceClientOffset();
  if (!offset) return;

  const transform = `translate(${offset.x}px, ${offset.y}px)`;
  dragPreviewRef.style['transform'] = transform;
  dragPreviewRef.style['-webkit-transform'] = transform;
};

const updateRef = ref => {
  dragPreviewRef = ref;
};

class DragPreview extends PureComponent {
  render() {
    const { isDragging } = this.props;
    if (!isDragging) return null;
    return (
      <span className="RTTreeViewer_DragPreview">
        <span className="RTTreeViewer_source-preview" ref={updateRef}>
          <NodeEntry {...this.props} />
        </span>
      </span>
    );
  }
}

DragPreview.propTypes = {
  isDragging: PropTypes.bool,
};

export default DragLayer(collector)(memo(DragPreview));
