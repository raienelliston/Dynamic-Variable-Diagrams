import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContainer, selectItem } from '../store/actions';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import styled from 'styled-components';
import ContextMenu from './ContextMenu';
import { ArcherElement } from 'react-archer';

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
  pointer-events: auto;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  z-index: ${(props) => (props.isDragging ? 1000 : 1)};
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
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const allVariables = useSelector((state) => state.diagram.variables);
  const allRelations = useSelector((state) => state.diagram.relations);
  const allContainers = useSelector((state) => state.diagram.containers);
  const variables = variableIds.map(id => allVariables.find(variable => variable.id === id));
  const relations = relationIds.map(id => allRelations.find(relation => relation.id === id));
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONTAINER,
    item: { id, name, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = Math.round(x + delta.x);
        const newY = Math.round(y + delta.y);
        dispatch(updateContainer({ id, name, x: newX, y: newY }));
      }
    },
  });

  const handleClick = () => {
    dispatch(selectItem(id));
  };

  const handleContextMenu = (event, type, object) => {
    event.preventDefault();
    const deleteItem = (type) => {
      if (type === 'relation') {
        dispatch({ type: 'DELETE_RELATION', payload: { id: object.id } });
      } else if (type === 'variable') {
        dispatch({ type: 'DELETE_VARIABLE', payload: { id: object.id } });
      }
    };

    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      items: [
        { label: 'Delete', onClick: () => deleteItem(type) },
      ],
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const determineAnchors = (sourcePos, targetPos) => {
    const diffX = targetPos.x - sourcePos.x;
    const diffY = targetPos.y - sourcePos.y;

    let sourceAnchor, targetAnchor;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        sourceAnchor = 'right';
        targetAnchor = 'left';
      } else {
        sourceAnchor = 'left';
        targetAnchor = 'right';
      }
    } else {
      if (diffY > 0) {
        sourceAnchor = 'bottom';
        targetAnchor = 'top';
      } else {
        sourceAnchor = 'top';
        targetAnchor = 'bottom';
      }
    }

    return { sourceAnchor, targetAnchor };
  };

  const findContainerForDependencyCoords = (dep, containers, currentContainerId) => {

    const container = containers.find((container) => {
      if (container.id === currentContainerId) {
        return false; // Skip the current container
      }
      if (dep.type === 'variable' && container.variables.includes(parseInt(dep.id))) {
        return true;
      }
      if (dep.type === 'relation' && container.relations.includes(parseInt(dep.id))) {
        return true;
      }
      return false;
    });

    if (container) {
      return { x: container.x, y: container.y };
    }

    return null;
  };

  const getDependencies = (formula) => {
    const variableDependencies = [...formula.matchAll(/variables\[(\d+)\]/g)].map((match) => ({
      id: match[1],
      type: 'variable',
    }));
    const relationDependencies = [...formula.matchAll(/relations\[(\d+)\]/g)].map((match) => ({
      id: match[1],
      type: 'relation',
    }));

    const uniqueDependencies = [...new Set([...variableDependencies, ...relationDependencies])];


    const mappedDependencies = uniqueDependencies.map((dep) => {
      const depContainer = findContainerForDependencyCoords(dep, allContainers, id);

      if (!depContainer) {
        return null;
      }

      const { x: sourceX, y: sourceY } = { x, y };
      const { x: targetX, y: targetY } = depContainer;

      const { sourceAnchor, targetAnchor } = determineAnchors({ x: sourceX, y: sourceY }, { x: targetX, y: targetY });

      const result = { ...dep, sourceAnchor, targetAnchor };

      return result;
    }).filter(dep => dep !== null);

    console.log('Mapped Dependencies:', mappedDependencies);

    return mappedDependencies;
  };

  const Relations = () => {
    if (!relations || relations.length === 0) {
      return null;
    }

    const containerRelations = relations.map((relation) => {
      const renamedFormula = relation.formula.replace(/variables\[(\d+)\]/g, (match, id) => allVariables.find(variable => variable.id === parseInt(id)).name).replace(/relations\[(\d+)\]/g, (match, id) => allRelations.find(relation => relation.id === parseInt(id)).name);

      const dependencies = getDependencies(relation.formula).map((dep, index) => ({
        targetId: `${dep.type}-${dep.id}`,
        targetAnchor: dep.targetAnchor,
        sourceAnchor: dep.sourceAnchor,
        style: { strokeColor: 'red', startMarker: true, endMarker: false, strokeWidth: 2, endShape: { arrow: { length: 10, width: 10 } } },
        label: <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid black', borderRadius: '5px' }}>{`${renamedFormula}`}</div>,
      }));

      return (
        <ArcherElement
          id={`relation-${relation.id}`}
          relations={dependencies}
          key={`relation-${relation.id}`}
        >
          <Relation key={`relation-${relation.id}`} onContextMenu={(e) => handleContextMenu(e, 'relation', relation)}>
            {relation.name} : {renamedFormula} = {relation.value}
          </Relation>
        </ArcherElement>
      );
    });

    return (
      <RelationContainer>
        <h2 style={{ margin: '5px' }}> Relations </h2>
        {containerRelations}
      </RelationContainer>
    );
  };

  const Variables = () => {
    if (!variables || variables.length === 0) {
      return null;
    }

    const containerVariables = variables.map((variable) => (
      <ArcherElement id={`variable-${variable.id}`} key={`variable-${variable.id}`}>
        <Variable key={variable.id} onContextMenu={(e) => handleContextMenu(e, 'variable', variable)}>
          {variable.name} : {variable.value}
        </Variable>
      </ArcherElement>
    ));

    return (
      <VariableContainer>
        <h2> Variables </h2>
        {containerVariables}
      </VariableContainer>
    );
  };

  return (
    <ContainerContainer onClick={handleClick} ref={drag} x={x} y={y} isDragging={isDragging} id={`container-${id}`}>
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
