import { configureStore } from '@reduxjs/toolkit';
import dataPersonalReducer from '../features/dataPersonalSlice';
import countryReducer from '../features/countrySlice';

const store = configureStore({
  reducer: {
    data: dataPersonalReducer,
    countryList: countryReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
