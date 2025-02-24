import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies, trendingSelector } from '../../../slices/movieSlice';
import MovieCard from '../../movieCard/movieCard';
import './trending.css';
import { motion } from 'framer-motion';

const Trending = () => {
    const dispatch = useDispatch();
    const trending = useSelector(trendingSelector);

    const containerRef = useRef(null);
    const [scrolling, setScrolling] = useState(null);

    const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 10; // Adjust for smoothness
      const intervalSpeed = 8; // Interval time in ms

      // Clear any existing scroll interval to avoid multiple intervals running
      if (scrolling) {
        clearInterval(scrolling);
      }
      const newInterval = setInterval(() => {
        if (containerRef.current) {
          if (direction === 'left') {
            containerRef.current.scrollLeft -= scrollAmount;
          } else if (direction === 'right') {
            containerRef.current.scrollLeft += scrollAmount;
          }
        }
      }, intervalSpeed);
      setScrolling(newInterval); // Set new interval
    }
  };

  const stopScrolling = () => {
    if (scrolling) {
      clearInterval(scrolling); // Clear interval when hover ends
      setScrolling(null);
    }
  };

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

    return (
        <div>
            <h1>
                Discover Trending Movies
            </h1>
            <div className='trendingSlideshow'>
            <motion.div
              ref={containerRef}
              className="d-flex flex-row slideshowMovies"
              style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {trending != null ? trending.map((body, index) => (
              <MovieCard
                key={index}
                title={body.title}
                release={body.release_date}
                vote={body.vote_average}
                poster={body.poster_path}
              />
              )) : ''}
            </motion.div>

        {/* Left Overlay for scrolling */}
          <motion.div
            className="position-absolute top-0 start-0 h-100 overlay"
            onHoverStart={() => handleScroll('left')}
            onHoverEnd={stopScrolling}
          ></motion.div>

        {/* Right Overlay for scrolling */}
          <motion.div
            className="position-absolute top-0 end-0 h-100 overlay"
            onHoverStart={() => handleScroll('right')}
            onHoverEnd={stopScrolling}
          ></motion.div>
        </div>
      </div>
    );
}

export default Trending;
