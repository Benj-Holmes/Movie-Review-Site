// obtain lists to populate trending, obtain the user's specific lists.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    trendingLists: [],
    loading: null,
    error: null,
};

// Thunk to retreive trending Lists from DB

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {

    }
})

// actions

// reducer
export default listSlice.reducer;
// selectors
export const tendingLists = (state) => state.list.trendingLists;