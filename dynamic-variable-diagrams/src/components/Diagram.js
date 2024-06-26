// src/components/Diagram.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import { addContainer, updateContainer } from '../store/actions';
import styled from 'styled-components';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { ArcherContainer, ArcherElement } from 'react-archer';

const DiagramWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Test = () => {
  const rootStyle = { display: 'flex', justifyContent: 'center' };
  const rowStyle = { margin: '200px 0', display: 'flex', justifyContent: 'space-between', }
  const boxStyle = { padding: '10px', border: '1px solid black', };


  return (
    <div style={{display: 'inline-block',} }>

      <div style={rootStyle}>
        <ArcherElement
          id="root"
          relations={[{
            targetId: 'element2',
            targetAnchor: 'top',
            sourceAnchor: 'bottom',
          }, 
        ]}
        >
          <div style={boxStyle}>Root</div>
        </ArcherElement>
      </div>

      <div style={rowStyle}>
        <ArcherElement
          id="element2"
          relations={[{
            targetId: 'element3',
            targetAnchor: 'left',
            sourceAnchor: 'right',
            style: { strokeColor: 'blue', strokeWidth: 1 },
            label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
          }]}
        >
          <div style={boxStyle}>Element 2</div>
        </ArcherElement>

        <ArcherElement id="element3">
          <div style={boxStyle}>Element 3</div>
        </ArcherElement>

        <ArcherElement
          id="element4"
          relations={[{
            targetId: 'root',
            targetAnchor: 'right',
            sourceAnchor: 'left',
            label: 'Arrow 3',
          }]}
        >
          <div style={boxStyle}>Element 4</div>
        </ArcherElement>
      </div>
  </div>
  );
};

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
      <ArcherContainer strokeColor="red">
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
      </ArcherContainer>
    </div>
  );
};

export default Diagram;