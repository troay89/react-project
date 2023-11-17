import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  searchString: string;
};

const initialState: InitialState = {
  searchString: '',
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
