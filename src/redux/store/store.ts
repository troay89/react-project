import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import { postAPI } from '../../api/apiRedux';
import countItemsReducer from '../features/count-items/countItems';

const rootReducer = combineReducers({
  search: searchReducer,
  itemsPage: countItemsReducer,
  [postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
