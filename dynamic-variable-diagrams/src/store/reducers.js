// src/store/reducers.js
import { ADD_NODE, UPDATE_NODE } from './actions';

const initialState = {
  nodes: [
    { id: 1, name: 'Node 1', x: 100, y: 100 },
    { id: 2, name: 'Node 2', x: 200, y: 100 },
    { id: 3, name: 'Node 3', x: 400, y: 200 },
],
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };
    case UPDATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload.id ? action.payload : node
        ),
      };
    default:
      return state;
  }
};

export default diagramReducer;