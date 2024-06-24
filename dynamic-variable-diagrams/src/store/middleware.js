
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

    saveDiagram(newState);

    console.log('New state:', newState);

    return result;
};