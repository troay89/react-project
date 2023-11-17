// import axios from 'axios';
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { ContentI } from '../../../models/models';
//
// type InitialState = {
//   loading: boolean;
//   users: ContentI | undefined;
//   error: string;
// };
//
// const initialState: InitialState = {
//   loading: false,
//   users: undefined,
//   error: '',
// };
//
// export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
//   const response = await axios.get(
//     'https://rickandmortyapi.com/api/character/?page=1'
//   );
//   return response.data;
// });
//
// const characterSlice = createSlice({
//   name: 'characterSlice',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(
//       fetchUsers.fulfilled,
//       (state, action: PayloadAction<ContentI>) => {
//         state.loading = false;
//         state.users = action.payload;
//         state.error = '';
//       }
//     );
//     builder.addCase(fetchUsers.rejected, (state, action) => {
//       state.loading = false;
//       state.users = undefined;
//       state.error = action.error.message || 'Something went wrong';
//     });
//   },
// });
//
// export default characterSlice.reducer;
