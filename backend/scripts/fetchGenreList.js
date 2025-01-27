const axios = require("axios");
require("dotenv").config();

/*
    This Code ensures the .env variables can load correctly, __dirname is a variable
    which means the current directory, and ../.env is the path to our .env file, 
    which is up one level from current.
*/
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 


/* 
    Fetching a List of Genres from the movie database API to populate our database,
    this is necessary as the API only provides genre ids and not the names, so we must
    convert them ourselves.
*/
const fetchGenreList = async () => {
    try {
        const response = await axios.get(process.env.GENRE_LIST_URL, {
            params: { api_key: process.env.TMDB_API_KEY },
        });
        return response.data.genres;
    } catch (err) {
        console.error("Unable to Fetch List of Genres", err);
        return [];
    }
};

fetchGenreList();

module.exports = fetchGenreList;