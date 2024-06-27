import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { updateContainer, selectItem } from '../store/actions';
import { ItemTypes } from './ItemTypes';
import Container from './Container';

const DiagramWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ${props => props.dragging ? 'grabbing' : 'default'}; /* Adjust cursor based on dragging state */
  overflow: hidden;
  pointer-events: auto;
`;

const Canvas = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transform: scale(${props => props.zoom});
  transform-origin: 0 0;
`;

const Diagram = () => {
  const dispatch = useDispatch();
  const containers = useSelector(state => state.diagram.containers);
  const selected = useSelector(state => state.diagram.selected);
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight }); // Initial size
  const [viewport, setViewport] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false); // Track dragging state
  const diagramRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Handle resizing of the canvas
  const handleResize = () => {
    setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
  };

  // Update canvas size on initial load and resize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle dragging functionality for canvas movement
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

  // Handle zooming functionality
  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1; // Adjust zoom speed
    const newZoom = Math.max(0.1, zoomLevel + delta);
    setZoomLevel(newZoom);
  };

  // Handle click on canvas to deselect container
  const handleCanvasClick = () => {
    dispatch(selectItem(null));
  };

  // Calculate canvas position based on viewport
  const canvasLeft = -viewport.x;
  const canvasTop = -viewport.y;

  return (
    <DiagramWrapper
      ref={diagramRef}
      dragging={dragging}
      onMouseDown={handleMouseDown}
      onClick={handleCanvasClick}
    >
      <Canvas
        top={canvasTop}
        left={canvasLeft}
        zoom={zoomLevel}
      >
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
