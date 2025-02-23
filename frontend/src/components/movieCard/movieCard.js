import React from 'react';
import './movieCard.css';

const MovieCard = (props) => {
    return (
    <div>
        <div className="movieCardContainer">
        <div className="movieDetailsOverlay d-flex flex-column justify-content-center align-items-center text-light">
            <h5 className="mb-1 text-center text-truncate" title={props.title}>{props.title}</h5>
            <div className="d-flex justify-content-around w-100 cardText">
                <p>{props.release.substring(0, 4)}</p>
                <p>{props.vote} /10</p>
            </div>
        </div>
        <img className="moviePoster" src={props.poster} />
        </div>
    </div>
    );
}

export default MovieCard;
