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

const Container = ({ id, name, text, x, y, variableIds, relationIds }) => {
  console.log('Container', id, name, x, y, variableIds, relationIds)
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const allVariables = useSelector((state) => state.diagram.variables);
  const allRelations = useSelector((state) => state.diagram.relations);
  const variables = variableIds.map((id) => allVariables.find((variable) => variable.Id === id));
  const relations = relationIds.map((id) => allRelations[id]);

  console.log('all variables', allVariables);

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

  console.log('Container', id, name, x, y, variables, relations);

  if (id === undefined) {
    return null;
  }

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

    const containerRelations = relations.map((relation) => {
      return (
        <div key={relation.Id} onContextMenu={(e) => handleContextMenu(e, 'relation', relation.Id)}>
          {relation.name}
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
    
    const containerVariables = variables.map((variable) => {
      return (
        <div key={variable.Id} onContextMenu={(e) => handleContextMenu(e, 'variable', variable.Id)}>
          {variable.name}
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