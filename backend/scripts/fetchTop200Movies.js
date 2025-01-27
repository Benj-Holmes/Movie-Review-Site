require('dotenv').config();
const axios = require("axios");
const fetchGenreList = require("./fetchGenreList");

// Specifies direct path to env file, it wasn't working without
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

const fetchMovies = async (page) => {
    try {
        const response = await axios.get(process.env.TOP_MOVIE_URL, {
            params: { api_key: process.env.TMDB_API_KEY, page },
        });
        if (response.status === 200) {
            return response.data.results.map((movie) => {
                return {
                    tvdb_id: movie.id,
                    title: movie.title,
                    vote_average: movie.vote_average,
                    synopsis: movie.overview,
                    release_date: movie.release_date,
                    original_title: movie.original_title,
                    original_language: movie.original_language,
                    poster_path: movie.poster_path,
                    genre_ids: movie.genre_ids,
                }
            })
        }
    } catch (error) {
        console.error(`Unable to Fetch Page ${page}`);
        return [];
    }
};

/* 
    API supports 20 movies per page, and you can only call one page at a time, 
    so we must make multiple calls
*/

const fetch200Movies = async () => {
    const genres = await fetchGenreList();
    let allMovies = [];

    for (let page = 1; page <= 10; page++) {
        const next20Movies = await fetchMovies(page);
        const moviesWithGenre = next20Movies.map((movie) => {
            /* 
                The Movies come with an id in place of a genre name,  so we also 
                fetch the list of genres so we can swap the ids for the genre name.
            */
            const genreNames = movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name || "Unknown");
            return {
                ...movie,
                genres: genreNames,
            };
        });
    
        allMovies = [...allMovies, ...moviesWithGenre];
    }
    return allMovies;
}

fetch200Movies();

module.exports = fetch200Movies;