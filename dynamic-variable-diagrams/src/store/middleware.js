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
  var changed = false;

  // Evaluate all relations when a container, relation, or variable is added or updated
  if (action.type !== 'EVALUATE_RELATIONS' && action.type !== 'EVALUATE_ALL_RELATIONS') {
    store.dispatch({ type: 'EVALUATE_ALL_RELATIONS' })
    var changed = true;
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

  // Remove relations that are not in any container or another relations formula
  if (action.type === 'DELETE_RELATION' || action.type === 'UPDATE_RELATION' || action.type === 'DELETE_CONTAINER') {
    const foundRelations = []; 

    for (const relation of newState.diagram.relations) {
      for (const container of newState.diagram.containers) {
        if (container.relations.includes(relation.id)) {
          foundRelations.push(relation.id);
        }
      }
      if(!foundRelations.includes(relation.id)) {
        store.dispatch({ type: 'DELETE_RELATION', payload: relation });
        var changed = true;
      }
    }

    const foundVariables = [];

    for (const variable of newState.diagram.variables) {
      for (const container of newState.diagram.containers) {
        if (container.variables.includes(variable.id)) {
          foundVariables.push(variable.id);
        }
      }
      if(!foundVariables.includes(variable.id)) {
        store.dispatch({ type: 'DELETE_VARIABLE', payload: variable });
        var changed = true;
      }
    }

  }
  //Delete 

  if (changed === false) {
    saveDiagram(newState);
  }

  return result;
};