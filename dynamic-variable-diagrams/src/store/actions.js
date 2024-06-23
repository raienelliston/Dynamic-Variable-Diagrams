// src/store/actions.js
export const ADD_CONTAINER = 'ADD_CONTAINER';
export const UPDATE_CONTAINER = 'UPDATE_CONTAINER';

export const addContainer = (container) => ({
  type: ADD_CONTAINER,
  payload: container,
});

export const updateContainer = (container) => ({
  type: UPDATE_CONTAINER,
  payload: container,
});