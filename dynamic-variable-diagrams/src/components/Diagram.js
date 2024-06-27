// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import { updateContainer, selectItem } from '../store/actions';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { ArcherElement } from 'react-archer';

const DiagramWrapper = styled.div`
  width: 100%;
  height: 100%;
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

  const onClick = () => {
    dispatch(selectItem(null));
  };

  return (
    <DiagramWrapper ref={drop} onClick={onclick}>
        {containers.map((container) => (
        <Container
          key={container.id}
          id={container.id}
          name={container.name}
          text={container.text}
          variableIds={container.variables}
          relationIds={container.relations}
          x={container.x}
          y={container.y}
        />
      ))}
    </DiagramWrapper>
  );
};

export default Diagram;