// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import diagramReducer from './reducers';

const store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
});

export default store;