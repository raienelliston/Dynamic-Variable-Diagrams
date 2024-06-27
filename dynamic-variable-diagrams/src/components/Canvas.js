import React, { Children, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: 1px solid #ccc;
  overflow: hidden;
`;

const ResizableCanvas = () => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // Initial size

  const handleResize = () => {
    if (canvasRef.current) {
      const { clientWidth, clientHeight } = canvasRef.current;
      setCanvasSize({ width: clientWidth, height: clientHeight });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CanvasWrapper ref={canvasRef} width={canvasSize.width} height={canvasSize.height}>
      {Children}
    </CanvasWrapper>
  );
};

export default ResizableCanvas;