// src/components/Node.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateNode } from '../store/actions';
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
  transform: translate(
    var(--node-x, 0px),
    var(--node-y, 0px)
  );
`;

const Node = ({ id, name, x, y }) => {
  const dispatch = useDispatch();

  return (
    <NodeContainer style={{ '--node-x': `${x}px`, '--node-y': `${y}px` }}>
      {name}
    </NodeContainer>
  );
};

export default Node;