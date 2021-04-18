import { configureStore } from '@reduxjs/toolkit';
import bugReducer from './bugSlice';

const store = configureStore({
  reducer: {
    bug: bugReducer,
  },
});

export default store;
