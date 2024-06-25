

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

  // if (action.type === 'UPDATE_VARIABLE' || action.type === 'UPDATE_RELATION' || action.type === 'DELETE_VARIABLE' || action.type === 'DELETE_RELATION' || action.type === 'ADD_VARIABLE' || action.type === 'ADD_RELATION' ) {

    // store.dispatch({ type: 'EVALUATE_RELATIONS' })

  // }

  if (action.type !== 'EVALUATE_RELATIONS' && action.type !== 'EVALUATE_ALL_RELATIONS') {
    store.dispatch({ type: 'EVALUATE_ALL_RELATIONS' })
  }

  saveDiagram(newState);

  return result;
};