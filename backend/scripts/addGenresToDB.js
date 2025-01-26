const fetchGenreList = require('./fetchGenreList'); 
const pool = require('../databaseSetup/db'); 

/* 
    This function takes the list of Genre Names from TMDB, and adds them to our
    Database.
*/

async function insertGenres() {
    try {
        const genres = await fetchGenreList();

        // They come back to us with an ID and a Name, so we just keep the name.
        const genreNames = genres.map(genre => genre.name);

        /* This block of code creates a Bulk Query so all of the names are added at once
           and we aren't querying the database 20+ times. */
        const values = genreNames.map(name => `('${name}')`).join(', ');
        const query = `INSERT INTO genres (name) VALUES ${values} ON CONFLICT (name) DO NOTHING`;
        await pool.query(query);

        console.log('Genres successfully inserted into the database!');
    } catch (err) {
        console.error('Error inserting genres:', err);
    }
}

insertGenres();