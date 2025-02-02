import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trendingMovies: [],
    selectedMovie: null,
};

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
    }
});

// actions
export const { populateTrendingList, selectMovie } = movieSlice.actions;

// reducer
export default movieSlice.reducer;

// selectors
export const selectTrendingMovies = (state) => state.movies.trendingMovies;
export const selectSelectedMovie = (state) => state.movies.selectedMovie;
