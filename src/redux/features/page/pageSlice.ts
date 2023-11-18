import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export default pageSlice.reducer;
export const { pageNumber } = pageSlice.actions;
