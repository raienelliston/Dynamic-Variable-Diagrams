// src/store/actions.js
export const ADD_NODE = 'ADD_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';

export const addNode = (node) => ({
  type: ADD_NODE,
  payload: node,
});

export const updateNode = (node) => ({
  type: UPDATE_NODE,
  payload: node,
});