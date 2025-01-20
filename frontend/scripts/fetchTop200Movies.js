require('dotenv').config();
const axios = require("axios");

const API_KEY = "ce944aeee2a74c43f3e7d6274bd37686";
const TOP_MOVIE_URL = "https://api.themoviedb.org/3/movie/top_rated";
const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";

/* 
    The Movies come with an id in place of a genre name,  so we also 
    fetch the list of genres so we can swap the ids for the genre name.
*/

const fetchGenreList = async () => {
    try {
        const response = await axios.get(GENRE_URL, {
            params: { api_key: API_KEY },
        });
        return response.data.genres;
    } catch (err) {
        console.error("Unable to Fetch Genres", err);
        return [];
    }
};

const fetchMovies = async (page) => {
    try {
        const response = await axios.get(TOP_MOVIE_URL, {
            params: { api_key: API_KEY, page },
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
            const genreNames = movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name || "Unknown");
            return {
                ...movie,
                genres: genreNames,
            };
        });
    
        allMovies = [...allMovies, ...moviesWithGenre];
    }
    console.log(allMovies);
}

// the env file isn't connecting up properly so i have hard coded the values for now
// console.log("API_KEY:", process.env.API_KEY);
// console.log("TOP_MOVIE_URL:", process.env.TOP_MOVIE_URL);
// console.log("GENRE_LIST_URL:", process.env.GENRE_LIST_URL);

fetch200Movies();