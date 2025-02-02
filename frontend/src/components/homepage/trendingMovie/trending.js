import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies } from '../../../slices/movieSlice';

const Trending = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrendingMovies());
    }, [dispatch]);

    return (
        <div>
            <h1>
                Discover Trending Movies
            </h1>
        </div>
    );
}

export default Trending;
