

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

  if (action.type !== 'EVALUATE_RELATIONS' && action.type !== 'EVALUATE_ALL_RELATIONS') {
    store.dispatch({ type: 'EVALUATE_ALL_RELATIONS' })
  }

  saveDiagram(newState);

  return result;
};