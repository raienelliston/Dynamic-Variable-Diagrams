import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContainer, selectItem, deleteVariable, deleteRelation } from '../store/actions';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';
import ContextMenu from './ContextMenu';
import { ArcherContainer, ArcherElement } from 'react-archer';
import './Container.css';

const ContainerContainer = styled.div`
  width: auto;
  min-width: 100px;
  height: auto;
  min-height: 50px;
  margin: 10px;
  background-color: lightblue;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  );
`;

const RelationContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
`;

const Relation = styled.div`
  display: flex;
  background-color: lightgreen;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  `;

const VariableContainer = styled.div`
  display: flex;
  display: inline-block;
  margin: 5px;
  align-items: center;
  justify-content: center;
`;

const Variable = styled.div` 
  display: flex;
  background-color: lightcoral;
  padding: 5px;
  border-radius: 5px;
`;

const Container = ({ id, name, text, x, y, variableIds, relationIds }) => {
  console.log('Container', id, name, x, y, variableIds, relationIds)
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const allVariables = useSelector((state) => state.diagram.variables);
  const allRelations = useSelector((state) => state.diagram.relations);
  const variables = variableIds.map(id => allVariables.find(variable => variable.id === id));
  const relations = relationIds.map(id => allRelations.find(relation => relation.id === id));

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

  const handleContextMenu = (event, type, object) => {
    event.preventDefault();
    console.log('right click');

    console.log('type', type, 'id', id);

    const deleteItem = (type) => {
      if (type === 'relation') {
        dispatch({ type: 'DELETE_RELATION', payload: { id: object.id } });;
      } else if (type === 'variable') {
        dispatch({ type: 'DELETE_VARIABLE', payload: { id: object.id } });;
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

  const getDependencies = (formula) => {
    const variableDependencies = [...formula.matchAll(/variables\[(\d+)\]/g)].map(match => match[1]);
    const relationDependencies = [...formula.matchAll(/relations\[(\d+)\]/g)].map(match => match[1]);
    return [...variableDependencies, ...relationDependencies];
  };

  const Relations = () => {

    if (relations[0] === undefined) {
      return (null);
    }

    const containerRelations = relations.map((relation) => {

      const dependencies = getDependencies(relation.formula).map(depId => ({
        targetId: `container-${id}`,
        targetAnchor: 'top',
        sourceAnchor: 'bottom',
        style: { strokeColor: 'red', strokeWidth: 2 },
      }));

      return (
        <ArcherElement id={`relation-${relation.id}`} relations={dependencies} key={relation.id}>
        <Relation key={relation.Id} onContextMenu={(e) => handleContextMenu(e, 'relation', relation)}>
          {relation.name} {" : "} {relation.formula} {" = "} {relation.value}
        </Relation>
        </ArcherElement>
      );
    });

    return (
      <RelationContainer>
        <h2 style={ {margin: "5px"}}> Relations </h2>
        {containerRelations} 
      </RelationContainer>
    );
  };

  const Variables = () => {

    if (variables[0] === undefined) {
      return (null);
    }
    
    const containerVariables = variables.map((variable) => {
      console.log('variable', variable);
      return (
        <Variable key={variable.Id} onContextMenu={(e) => handleContextMenu(e, 'variable', variable)}>
          {variable.name} {" : "} {variable.value}
        </Variable>
      );
    });

    return (
      <VariableContainer>
        <h2> Variables </h2>
        {containerVariables}
      </VariableContainer>
    );
  };

  return (
    <ContainerContainer onClick={handleClick} ref={drag} x={x} y={y} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <h1> {name} </h1> 
        {text}
        <Relations />
        <Variables />
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