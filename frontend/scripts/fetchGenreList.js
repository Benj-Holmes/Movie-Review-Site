const axios = require("axios");

const API_KEY = "ce944aeee2a74c43f3e7d6274bd37686";
const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";

/* 
    Fetching a List of Genres to populate our database, so that when 
    we query the API later on, we can properly add this to our rows.
*/

const fetchGenreList = async () => {
    try {
        const response = await axios.get(GENRE_URL, {
            params: { api_key: API_KEY },
        });
        console.log(response.data.genres);
        return response.data.genres;
    } catch (err) {
        console.error("Unable to Fetch Genres", err);
        return [];
    }
};

fetchGenreList();

module.exports = fetchGenreList;