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

// Export actions
export const { populateTrendingList, selectMovie } = movieSlice.actions;

// Export reducer
export default movieSlice.reducer;

// Export selectors
export const selectTrendingMovies = (state) => state.movies.trendingMovies;
export const selectSelectedMovie = (state) => state.movies.selectedMovie;
