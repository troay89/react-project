import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [
  'Australia',
  'Austria',
  'Albania',
  'Belgium',
  'Bulgaria',
  'Brazil',
  'Hungary',
  'Germany',
  'Greece',
  'Denmark',
  'Egypt',
  'India',
  'Ireland',
  'Spain',
  'Italy',
  'Canada',
  'China',
  'Malta',
  'Mexico',
  'the Netherlands,	Dutch',
  'Norway',
  'the United Arab Emirates',
  'Poland',
  'Portugal',
  'Romania',
  'Serbia',
  'Slovenia',
  'the United Kingdom ',
  'the United States of America',
  'Thailand',
  'Turkey',
  'Ukraine',
  'Wales',
  'Finland',
  'France',
  'Croatia',
  'the Czech Republic',
  'Switzerland',
  'Scotland',
  'South Korea	Korean',
  'Japan',
];

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getListCountry: (state) => state,
  },
});

export default countrySlice.reducer;
export const { getListCountry } = countrySlice.actions;
