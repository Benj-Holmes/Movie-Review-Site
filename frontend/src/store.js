import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';  // Import default export

export const store = configureStore({
    reducer: {
        movies: movieReducer,  // Correct format
    },
});
