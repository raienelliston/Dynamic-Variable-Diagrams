import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContainer, selectItem, deleteVariable, deleteRelation } from '../store/actions';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';
import ContextMenu from './ContextMenu';
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
  const [contextMenu, setContextMenu] = useState(null);

  const [ { isDragging } , drag] = useDrag({
    type: ItemTypes.CONTAINER,
    item: { id, name, x, y },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: () => {
      dispatch(selectItem(id));
      return { id, name, x, y };
    },
  });

  const handleClick = () => {
    dispatch(selectItem(id));
  };

  const handleContextMenu = (event, type, id) => {
    event.preventDefault();
    console.log('right click');

    const deleteItem = (type) => {
      if (type === 'relation') {
        dispatch({ type: 'DELETE_RELATION', payload: { id: id } });;
      } else if (type === 'variable') {
        dispatch({ type: 'DELETE_VARIABLE', payload: { id: id } });;
      }
    };

    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      items: [
        { label: 'Delete', onClick: () => deleteItem(type) },
      ],
    })
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const Relations = () => {
    const relations = useSelector((state) => state.diagram.relations);
    const container = useSelector((state) => state.diagram.containers[id]);
    console.log(JSON.stringify(container));

    const containerRelations = container.relations.map((relationId) => {
      const relation = relations[relationId];
      const value = relation.value;
      return (
        <div key={relationId} onContextMenu={(e) => handleContextMenu(e, 'relation', relationId)}>
          {relation.name}{" :"} {value}
        </div>
      );
    });

    return (
      <div>
        {containerRelations}
      </div>
    );
  };

  const Variables = () => {
    const variables = useSelector((state) => state.diagram.variables);
    const container = useSelector((state) => state.diagram.containers[id]);
    const containerVariables = container.variables.map((variableId) => {
      const variable = variables[variableId];
      return (
        <div key={variableId} onContextMenu={(e) => handleContextMenu(e, 'variable', variableId)}>
          {variable.name}{" :"} {variable.value}
        </div>
      );
    });

    return (
      <div>
        {containerVariables}
      </div>
    );
  };

  const RelationFormulas = () => {
    
    const relations = useSelector((state) => state.diagram.relations);
    const container = useSelector((state) => state.diagram.containers[id]);

    console.log(JSON.stringify(container));
    const containerRelations = container.relations.map((relationId) => {
      const relation = relations[relationId];
      const value = relation.formula;
      return (
        <div key={relationId}>
          {relation.name}: {value}
        </div>
      );
    });

    return (
      <div>
        {containerRelations}
      </div>
    );
  }

  return (
    <ContainerContainer onClick={handleClick} ref={drag} x={x} y={y} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ margin: '5px' }}>
        <h1> {name} </h1> 
        {id}
        {text}
        <h2> Relations </h2>
        <Relations />
        {/* <RelationFormulas /> */}
        <h2> Variables </h2>
        <Variables />
      </div>
      {contextMenu && (
        <ContextMenu
          items={contextMenu.items}
          position={contextMenu.position}
          onClose={handleCloseContextMenu}
        />
      )}
    </ContainerContainer>
  );
};

export default Container;