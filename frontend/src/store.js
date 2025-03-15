import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice'; 
import listReducer from './slices/userListsSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        lists: listReducer
    },
});
