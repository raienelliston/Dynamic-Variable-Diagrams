// src/store/actions.js
export const ADD_CONTAINER = 'ADD_CONTAINER';
export const UPDATE_CONTAINER = 'UPDATE_CONTAINER';
export const DELETE_CONTAINER = 'DELETE_CONTAINER';
export const ADD_RELATION = 'ADD_RELATION';
export const UPDATE_RELATION = 'UPDATE_RELATION';
export const DELETE_RELATION = 'DELETE_RELATION';
export const ADD_VARIABLE = 'ADD_VARIABLE';
export const UPDATE_VARIABLE = 'UPDATE_VARIABLE';
export const DELETE_VARIABLE = 'DELETE_VARIABLE';
export const ADD_NODE_TO_CONTAINER = 'ADD_NODE_TO_CONTAINER';
export const DELETE_NODE_FROM_CONTAINER = 'DELETE_NODE_FROM_CONTAINER';

export const addContainer = (containerId, name, text) => ({
  type: ADD_CONTAINER,
  payload: { containerId, name, text},
});

export const updateContainer = (containerId, name, text) => ({
  type: UPDATE_CONTAINER,
  payload: { containerId, name, text},
});

export const deleteContainer = (containerId) => ({
  type: DELETE_CONTAINER,
  payload: { containerId },
});

export const addRelation = (containerId, name, formula) => ({
  type: ADD_RELATION,
  payload: { containerId, name, formula },
});

export const updateRelation = (containerId, name, formula) => ({
  type: UPDATE_RELATION,
  payload: { containerId, name, formula },
});

export const deleteRelation = (containerId, name) => ({
  type: DELETE_RELATION,
  payload: { containerId, name },
});

export const addVariable = (containerId, name, value) => ({
  type: ADD_VARIABLE,
  payload: { containerId, name, value },
});

export const updateVariable = (containerId, name, value) => ({
  type: UPDATE_VARIABLE,
  payload: { containerId, name, value },
});

export const deleteVariable = (containerId, name) => ({
  type: DELETE_VARIABLE,
  payload: { containerId, name },
});

export const addNodeToContainer = (containerId, nodeId) => ({
  type: ADD_NODE_TO_CONTAINER,
  payload: { containerId, nodeId },
});

export const deleteNodeFromContainer = (containerId, nodeId) => ({
  type: DELETE_NODE_FROM_CONTAINER,
  payload: { containerId, nodeId },
});