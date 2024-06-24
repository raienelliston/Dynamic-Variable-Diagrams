// src/components/Container.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateContainer, selectItem } from '../store/actions';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';
import './Container.css';

const ContainerContainer = styled.div`
  width: auto;
  min-width: 100px;
  height: auto;
  min-height: 50px;
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

const Container = ({ id, name, text, x, y }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.diagram.selectedItem);

  const [ { isDragging } , drag] = useDrag({
    type: ItemTypes.CONTAINER,
    item: { id, name, x, y },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
  });

  const handleClick = () => {
    dispatch(selectItem(id));
  };

  return (
    <ContainerContainer onClick={handleClick} ref={drag} x={x} y={y} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ margin: '5px' }}>
        <h1> {name} </h1> 
        {id}
        {text}
      </div>
    </ContainerContainer>
  );
};

export default Container;