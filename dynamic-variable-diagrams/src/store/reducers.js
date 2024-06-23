// src/store/reducers.js
import { ADD_CONTAINER, UPDATE_CONTAINER, DELETE_CONTAINER, ADD_RELATION, UPDATE_RELATION, DELETE_RELATION, ADD_VARIABLE, UPDATE_VARIABLE, DELETE_VARIABLE, ADD_NODE_TO_CONTAINER, DELETE_NODE_FROM_CONTAINER } from './actions';

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
        containers: {
          ...state.containers,
          [action.payload.containerId]: { nodes: [], variables: {}, relations: {} },
        },
      };
    case DELETE_CONTAINER:
      const { [action.payload.containerId]: _, ...restContainers } = state.containers;
      return {
        ...state,
        containers: restContainers,
      };
    case ADD_NODE_TO_CONTAINER:
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            nodes: [...state.containers[action.payload.containerId].nodes, action.payload.nodeId],
          },
        },
      };
    case DELETE_NODE_FROM_CONTAINER:
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            nodes: state.containers[action.payload.containerId].nodes.filter(
              (nodeId) => nodeId !== action.payload.nodeId
            ),
          },
        },
      };
    case ADD_VARIABLE:
    case UPDATE_VARIABLE:
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            variables: {
              ...state.containers[action.payload.containerId].variables,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      };
    case DELETE_VARIABLE:
      const {
        [action.payload.name]: __,
        ...restVariables
      } = state.containers[action.payload.containerId].variables;
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            variables: restVariables,
          },
        },
      };
    case ADD_RELATION:
    case UPDATE_RELATION:
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            relations: {
              ...state.containers[action.payload.containerId].relations,
              [action.payload.name]: action.payload.formula,
            },
          },
        },
      };
    case DELETE_RELATION:
      const {
        [action.payload.name]: ___,
        ...restRelations
      } = state.containers[action.payload.containerId].relations;
      return {
        ...state,
        containers: {
          ...state.containers,
          [action.payload.containerId]: {
            ...state.containers[action.payload.containerId],
            relations: restRelations,
          },
        },
      };
    default:
      return state;
  }
};

export default diagramReducer;