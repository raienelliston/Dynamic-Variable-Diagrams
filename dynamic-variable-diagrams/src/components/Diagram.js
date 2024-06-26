// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import { updateContainer } from '../store/actions';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { ArcherElement } from 'react-archer';

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
    <div ref={drop}>
        {containers.map((container) => (
        <Container
          key={container.id}
          id={container.id}
          name={container.name}
          variableIds={container.variables}
          relationIds={container.relations}
          x={container.x}
          y={container.y}
        />
      ))}
    </div>
  );
};

export default Diagram;