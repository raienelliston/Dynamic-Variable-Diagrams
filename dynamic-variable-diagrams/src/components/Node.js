// src/components/Node.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateNode } from '../store/actions';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';

const NodeContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightblue;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  );
`;

const Node = ({ id, name, x, y }) => {
  const dispatch = useDispatch();

  const [ { isDragging } , drag] = useDrag({
    type: ItemTypes.NODE,
    item: { id, x, y },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
  });

  return (
    <NodeContainer ref={drag} x={x} y={y} isDragging={isDragging} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </NodeContainer>
  );
};

export default Node;