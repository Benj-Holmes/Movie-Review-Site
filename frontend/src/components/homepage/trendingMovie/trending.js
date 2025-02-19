import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies, trendingSelector } from '../../../slices/movieSlice';
import MovieCard from '../../movieCard/movieCard';
import './trending.css';

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
                <div className='d-flex flex-row slideshowMovies'>
                {trending != null ? trending.map((body, index) => 
                <MovieCard 
                    key={index}
                    title={body.title} 
                    release={body.release_date} 
                    vote={body.vote_average} 
                    poster={body.poster_path}
                />) : '' }
                </div>
                {/* Left Overlay for scrolling */}
                <div className='position-absolute top-0 start-0 h-100 overlay'>
                </div>
                {/* Right Overlay for scrolling */}
                <div className='position-absolute top-0 end-0 h-100 overlay'>
                </div>
            </div>
        </div>
    );
}

export default Trending;
