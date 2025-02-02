import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies, trendingSelector } from '../../../slices/movieSlice';
import MovieCard from '../../movieCard/movieCard';

const Trending = () => {
    const dispatch = useDispatch();
    const trending = useSelector(trendingSelector);

    useEffect(() => {
        dispatch(getTrendingMovies());
    }, [dispatch]);

    return (
        <div>
            <h1>
                Discover Trending Movies
            </h1>
            <div className='trendingSlideshow'>
                {trending != null ? trending.map((body, index) => <MovieCard key={index}
                title={body.title} release={body.release_date} vote={body.vote_average} poster={body.poster_path}
                />) : '' }
            </div>
        </div>
    );
}

export default Trending;
