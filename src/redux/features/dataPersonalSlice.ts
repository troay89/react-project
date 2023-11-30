import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataPerson } from '../../models/models.ts';

const initialState: DataPerson = {
  username: '',
  age: '',
  email: '',
  firstPassword: '',
  secondPassword: '',
  country: '',
  gender: '',
  download: '',
};

const dataPersonalSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataPerson>) => {
      return { ...state, ...action.payload };
    },
  },
});

export default dataPersonalSlice.reducer;
export const { setData } = dataPersonalSlice.actions;
