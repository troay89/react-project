import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeSearch } from '../search/searchSlice';
import { countItems } from '../count-items/countItemsSlice';

type InitialState = {
  pageNumber: number;
};

const initialState: InitialState = {
  pageNumber: 1,
};

const pageSlice = createSlice({
  name: 'pageNumber',
  initialState,
  reducers: {
    pageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeSearch, (state) => {
      state.pageNumber = 1;
    });
    builder.addCase(countItems, (state) => {
      state.pageNumber = 1;
    });
  },
});

export default pageSlice.reducer;
export const { pageNumber } = pageSlice.actions;
