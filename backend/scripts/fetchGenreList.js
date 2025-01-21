const axios = require("axios");

const TMDB_API_KEY = "ce944aeee2a74c43f3e7d6274bd37686";
const GENRELIST_URL = "https://api.themoviedb.org/3/genre/movie/list";

/* 
    Fetching a List of Genres from the movie database API to populate our database,
    this is necessary as the API only provides genre ids and not the names, so we must
    convert them ourselves.
*/

const fetchGenreList = async () => {
    try {
        const response = await axios.get(GENRELIST_URL, {
            params: { api_key: TMDB_API_KEY },
        });
        console.log(response.data.genres);
        return response.data.genres;
    } catch (err) {
        console.error("Unable to Fetch List of Genres", err);
        return [];
    }
};

fetchGenreList();

module.exports = fetchGenreList;