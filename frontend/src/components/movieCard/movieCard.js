import React from 'react';

const MovieCard = (props) => {
    return (
        <div>
            <h5>{props.title} 555</h5>
            <img src={props.poster} />
            <p>{props.release.substring(0,4)} -------- {props.vote} /10</p>
        </div>
    );
}

export default MovieCard;
