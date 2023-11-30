import { configureStore } from '@reduxjs/toolkit';
import dataPersonalReducer from '../features/dataPersonalSlice.ts';

const store = configureStore({
  reducer: {
    data: dataPersonalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
