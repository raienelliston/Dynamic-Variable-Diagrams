// src/store/reducers.js
import { ADD_CONTAINER, UPDATE_CONTAINER, DELETE_CONTAINER, ADD_RELATION, UPDATE_RELATION, DELETE_RELATION, ADD_VARIABLE, UPDATE_VARIABLE, DELETE_VARIABLE, ADD_NODE_TO_CONTAINER, DELETE_NODE_FROM_CONTAINER } from './actions';

const initialState = {
  containers: [
    { id: 1, name: 'Container 1', text: "this is a container", x: 100, y: 100, changableVars: [], dependentVars: []},
    { id: 2, name: 'Container 2', text: "", x: 200, y: 100, changableVars: [], dependentVars: [] },
    { id: 3, name: 'Container 3', text: "", x: 400, y: 200, changableVars: [], dependentVars: [] },
],
  relations: [],
  variables: [],
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
    case DELETE_CONTAINER:
      return {
        ...state,
        containers: state.containers.filter(container => container.id !== action.payload.id),
      };
    case ADD_RELATION:
      return {
        ...state,
        relations: [...state.relations, action.payload],
      };
    case UPDATE_RELATION:
      return {
        ...state,
        relations: state.relations.map(relation =>
          relation.id === action.payload.id ? action.payload : relation
        ),
      };
    case DELETE_RELATION:
      return {
        ...state,
        relations: state.relations.filter(relation => relation.id !== action.payload.id),
      };
    case ADD_VARIABLE:
      return {
        ...state,
        variables: [...state.variables, action.payload],
      };
    case UPDATE_VARIABLE:
      return {
        ...state,
        variables: state.variables.map(variable =>
          variable.id === action.payload.id ? action.payload : variable
        ),
      };
    case DELETE_VARIABLE:
      return {
        ...state,
        variables: state.variables.filter(variable => variable.id !== action.payload.id),
      };
    case ADD_NODE_TO_CONTAINER:
      return state;
    case DELETE_NODE_FROM_CONTAINER:
      return state;
    default:
      return state;
  }
};

export default diagramReducer;