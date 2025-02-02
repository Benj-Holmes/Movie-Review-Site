import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    trendingMovies: [],
    selectedMovie: null,
    loading: null,
    error: null,
};

export const getTrendingMovies = createAsyncThunk(
    'movies/getTrending',
    async () => {
        const response = await axios.get('http://localhost:4000/movies/trending');
        return response.data;
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        populateTrendingList: (state, action) => {
            state.trendingMovies = action.payload;
        },
        selectMovie: (state, action) => {
            state.selectedMovie = action.payload;
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(getTrendingMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getTrendingMovies.fulfilled, (state, action) => {
            state.trendingMovies = action.payload;
            state.loading = false;
        })
        .addCase(getTrendingMovies.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
});

// actions
export const { populateTrendingList, selectMovie } = movieSlice.actions;

// reducer
export default movieSlice.reducer;

// selectors
export const trendingSelector = (state) => state.movies.trendingMovies;
export const movieSelector = (state) => state.movies.selectedMovie;
