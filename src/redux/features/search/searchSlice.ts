import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH_VALUE } from '../../../models/models';

type InitialState = {
  searchString: string;
};

const initialState: InitialState = {
  searchString: localStorage.getItem(SEARCH_VALUE) ?? '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { changeSearch } = searchSlice.actions;
