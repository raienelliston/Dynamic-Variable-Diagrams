// src/store/reducers.js
import { ADD_NODE, UPDATE_NODE } from './actions';

const initialState = {
  nodes: [
    { id: 1, name: 'Node 1', text: "this is a node", x: 100, y: 100, changableVars: [], dependentVars: []},
    { id: 2, name: 'Node 2', text: "", x: 200, y: 100, changableVars: [], dependentVars: [] },
    { id: 3, name: 'Node 3', text: "", x: 400, y: 200, changableVars: [], dependentVars: [] },
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
      console.log(state);
    default:
      return state;
  }
};

export default diagramReducer;