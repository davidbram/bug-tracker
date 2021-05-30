import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { retrieveBugs } from '../bugController';
import axios from 'axios';

export const getBugs = createAsyncThunk(
  'bugs/getBugs',
  (endpoint, { getState }) => {
    return axios
      .get(endpoint)
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((json) => json);
  }
);

const slice = createSlice({
  name: 'bug',
  initialState: {
    loading: '',
    error: '',
    data: [],
  },
  reducers: {
    // [getBugs.pending]:state => {
    //     state.loading = "yes";
    // },

    // [getBugs.fulfilled]:(state, action) => {
    //     state.loading = "no";
    //     state.data = action.payload;
    // },

    // [getBugs.rejected]:(state, action) => {
    //     state.loading = "no";
    //     state.error = action.payload;
    // },

    getBugs: (state) => {},

    createBugs: (state, action) => {},
    updateBugs: (state, action) => {},
    markComplete: (state, action) => {},
  },
});

const bugReducer = slice.reducer;

export default bugReducer;
// export const {getBugs,createBugs,updateBugs,markComplete} = slice.actions;
