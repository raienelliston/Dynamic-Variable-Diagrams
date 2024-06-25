// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import { addContainer, updateContainer } from '../store/actions';
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
  const containers = useSelector((state) => state.diagram.containers);
  const dispatch = useDispatch();

  console.log(containers);

  const [, drop] = useDrop({
    accept: ItemTypes.CONTAINER,
    drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const x = Math.round(item.x + delta.x);
        const y = Math.round(item.y + delta.y);
        dispatch(updateContainer({ id: item.id, name: item.name, x, y }));
    },
  });

  return (
    <DiagramContainer ref={drop}>
      {containers.map((container) => (
        <Container {...container} variableIds={container.variables} relationIds={container.relations} />
      ))}
    </DiagramContainer>
  );
};

export default Diagram;