function saveDiagram(newState) {
    const diagram = {
      containers: newState.diagram.containers,
      relations: newState.diagram.relations,
      variables: newState.diagram.variables,
    };
    localStorage.setItem('diagram', JSON.stringify(diagram));
}
  
export const stateChangeMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const newState = store.getState();
  console.log('New state:', newState);

  // Evaluate all relations when a container, relation, or variable is added or updated
  if (action.type !== 'EVALUATE_RELATIONS' && action.type !== 'EVALUATE_ALL_RELATIONS') {
    store.dispatch({ type: 'EVALUATE_ALL_RELATIONS' })
  }

  // Check for duplicated containers, relations and variables
  if (action.type === 'ADD_CONTAINER' || action.type === 'UPDATE_CONTAINER' || action.type === 'ADD_RELATION' || action.type === 'UPDATE_RELATION' || action.type === 'ADD_VARIABLE' || action.type === 'UPDATE_VARIABLE') {
    const seen = new Set();

    for (const container of newState.diagram.containers) {
      for (const relationId of container.relations) {
        if (seen.has(relationId)) {
          throw new Error(`Relation ${relationId} is duplicated`);
        }
        seen.add(relationId);
      }
    }

    const seenContainers = new Set();

    for (const container of Object.values(newState.diagram.containers)) {
      if (seenContainers.has(container.id)) {
        throw new Error(`Container ${container.id} is duplicated`);
      }
      seenContainers.add(container.id);
    }

    const seenVariables = new Set();

    for (const container of Object.values(newState.diagram.containers)) {
      for (const variableId of container.variables) {
        if (seenVariables.has(variableId)) {
          throw new Error(`Variable ${variableId} is duplicated`);
        }
        seenVariables.add(variableId);
      }
    }
  }

  // If a container is deleted, change ids of containers to avoid conflicts
  if (action.type === 'DELETE_CONTAINER') {
    const containerId = action.payload.id;
    const container = newState.diagram.containers.find(container => container.id === containerId);

    const newContainers = newState.diagram.containers.map(container => {
      if (container.id > containerId) {
        return {
          ...container,
          id: container.id - 1,
        };
      }
      return container;
    });

    const newRelations = newState.diagram.relations.map(relation => {
      if (container.relations.includes(relation.id)) {
        return {
          ...relation,
          containerId: container.id - 1,
        };
      }
      return relation;
    });

    const newVariables = newState.diagram.variables.map(variable => {
      if (container.variables.includes(variable.id)) {
        return {
          ...variable,
          containerId: container.id - 1,
        };
      }
      return variable;
    });

    newState.diagram.containers = newContainers;
    newState.diagram.relations = newRelations;
    newState.diagram.variables = newVariables;
  }

  //Delete container, relation or variable without a name

  saveDiagram(newState);

  return result;
};