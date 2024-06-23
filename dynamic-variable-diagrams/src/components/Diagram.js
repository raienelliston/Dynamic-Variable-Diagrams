// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Node from './Node';
import { addNode, updateNode } from '../store/actions';
import styled from 'styled-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DiagramContainer = styled.div`
  width: 100%;
  height: 90vh;
  border: 1px solid #ddd;
  position: relative;
`;

const Diagram = () => {
  const nodes = useSelector((state) => state.diagram.nodes);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: ItemTypes.NODE,
    drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const x = Math.round(item.x + delta.x);
        const y = Math.round(item.y + delta.y);
        dispatch(updateNode({ id: item.id, name: item.name, x, y }));
    },
  });

  const handleAddNode = () => {
    const newNode = { id: nodes.length + 1, name: `Node ${nodes.length + 1}`, x:0, y:0 };
    dispatch(addNode(newNode));
  };

  return (
    <DiagramContainer ref={drop}>
      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
      <button onClick={handleAddNode}>Add Node</button>
    </DiagramContainer>
  );
};

export default Diagram;