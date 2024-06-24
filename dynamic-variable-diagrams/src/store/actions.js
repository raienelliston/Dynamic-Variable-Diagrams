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
export const SELECT_ITEM = 'SELECT_ITEM';

export const addContainer = (container) => ({
  type: ADD_CONTAINER,
  payload: container,
});

export const updateContainer = (container) => ({
  type: UPDATE_CONTAINER,
  payload: container,
});

export const deleteContainer = (container) => ({
  type: DELETE_CONTAINER,
  payload: container,
});

export const addRelation = (relation) => ({
  type: ADD_RELATION,
  payload: relation,
});

export const updateRelation = (relation) => ({
  type: UPDATE_RELATION,
  payload: relation,
});

export const deleteRelation = (relation) => ({
  type: DELETE_RELATION,
  payload: relation,
});

export const addVariable = (variable) => ({
  type: ADD_VARIABLE,
  payload: variable,
});

export const updateVariable = (variable) => ({
  type: UPDATE_VARIABLE,
  payload: variable,
});

export const deleteVariable = (variable) => ({
  type: DELETE_VARIABLE,
  payload: variable,
});

export const addNodeToContainer = (node) => ({
  type: ADD_NODE_TO_CONTAINER,
  payload: node,
});

export const deleteNodeFromContainer = (node) => ({
  type: DELETE_NODE_FROM_CONTAINER,
  payload: node,
});

export const selectItem = (item) => ({
  type: SELECT_ITEM,
  payload: item,
});