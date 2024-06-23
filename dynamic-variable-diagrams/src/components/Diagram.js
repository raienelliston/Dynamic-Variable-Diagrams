// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Node from './Node';
import { addNode } from '../store/actions';
import styled from 'styled-components';
import { useState } from 'react';

const DiagramContainer = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid #ddd;
  position: relative;
`;

const Diagram = () => {
  const nodes = useSelector((state) => state.diagram.nodes);
  const dispatch = useDispatch();
  const {x, setX} = useState(0);

  const handleAddNode = () => {
    const newNode = { id: nodes.length + 1, name: `Node ${nodes.length + 1}`, x:x, y:0 };
    dispatch(addNode(newNode));
  };

  return (
    <DiagramContainer>
      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
      <button onClick={handleAddNode}>Add Node</button>
    </DiagramContainer>
  );
};

export default Diagram;