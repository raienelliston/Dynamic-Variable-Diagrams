import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { updateContainer, selectItem } from '../store/actions';
import { ItemTypes } from './ItemTypes';
import Container from './Container';

const Canvas = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transform: scale(${props => props.zoom});
  transform-origin: 0 0;
`;
const DiagramWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ${props => props.dragging ? 'grabbing' : 'default'};
  overflow: hidden;
  pointer-events: auto; /* Ensure pointer events are enabled */
`;

const Diagram = () => {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const [viewport, setViewport] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const containers = useSelector(state => state.diagram.containers);
  const selected = useSelector(state => state.diagram.selected);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    const startX = event.pageX - viewport.x;
    const startY = event.pageY - viewport.y;

    const handleMouseMove = (event) => {
      const newViewportX = event.pageX - startX;
      const newViewportY = event.pageY - startY;
      setViewport({ x: newViewportX, y: newViewportY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.1, zoomLevel + delta);
    setZoomLevel(newZoom);
  };

  const handleCanvasClick = () => {
    dispatch(selectItem(null));
  };

  const canvasLeft = -viewport.x;
  const canvasTop = -viewport.y;

  return (
    <DiagramWrapper
      dragging={dragging}
      onMouseDown={handleMouseDown}
      onClick={handleCanvasClick}
    >
      <Canvas top={canvasTop} left={canvasLeft} zoom={zoomLevel}>
        {containers.map((container) => (
          <Container
            key={container.id}
            id={container.id}
            name={container.name}
            variableIds={container.variables}
            relationIds={container.relations}
            x={container.x}
            y={container.y}
            isSelected={selected === container.id}
            isSelectable={true}
          />
        ))}
      </Canvas>
    </DiagramWrapper>
  );
};

export default Diagram;
