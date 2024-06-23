// src/store/reducers.js
import { ADD_CONTAINER, UPDATE_CONTAINER } from './actions';

const initialState = {
  containers: [
    { id: 1, name: 'Container 1', text: "this is a container", x: 100, y: 100, changableVars: [], dependentVars: []},
    { id: 2, name: 'Container 2', text: "", x: 200, y: 100, changableVars: [], dependentVars: [] },
    { id: 3, name: 'Container 3', text: "", x: 400, y: 200, changableVars: [], dependentVars: [] },
],
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTAINER:
      return {
        ...state,
        containers: [...state.containers, action.payload],
      };
    case UPDATE_CONTAINER:
      return {
        ...state,
        containers: state.containers.map(container =>
          container.id === action.payload.id ? action.payload : container
        ),
      };
      console.log(state);
    default:
      return state;
  }
};

export default diagramReducer;