import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  countItems: number;
};

const initialState: InitialState = {
  countItems: 20,
};

const countItemsSlice = createSlice({
  name: 'countItems',
  initialState,
  reducers: {
    countItems: (state, action: PayloadAction<number>) => {
      state.countItems = action.payload;
    },
  },
});

export default countItemsSlice.reducer;
export const { countItems } = countItemsSlice.actions;
