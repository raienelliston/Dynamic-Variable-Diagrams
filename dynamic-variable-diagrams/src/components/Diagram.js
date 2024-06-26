// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import { addContainer, updateContainer } from '../store/actions';
import styled from 'styled-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { ArcherContainer } from 'react-archer';

const DiagramWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white; /* Added for visibility */
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
    <DiagramWrapper ref={drop}>
      <ArcherContainer strokeColor="red" style={{ border: '1px solid black', padding: '10px', zIndex: '10' }} >
        {containers.map((container) => (
        <Container {...container} key={container.id} variableIds={container.variables} relationIds={container.relations} />
      ))}
      </ArcherContainer>
    </DiagramWrapper>
  );
};

export default Diagram;