import React from 'react';
import './movieCard.css';

const MovieCard = (props) => {
    return (
        <div>
            <h5>{props.title}</h5>
            <img className='moviePoster' src={props.poster} />
            <p>{props.release.substring(0,4)} -------- {props.vote} /10</p>
        </div>
    );
}

export default MovieCard;
