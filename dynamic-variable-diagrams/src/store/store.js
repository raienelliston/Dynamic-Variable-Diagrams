import { configureStore } from '@reduxjs/toolkit';
import diagramReducer from './reducers';
import { stateChangeMiddleware } from './middleware'; // Your middleware file

const store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateChangeMiddleware),
});

export default store;