const pool = require('../databaseSetup/db');
const fetch200Movies = require('./fetchTop200Movies');

const fetchGenresFromDB = async () => {
    const result = await pool.query('SELECT * FROM genres');
    // Returning the rows directly, which will be an array of genre objects
    return result.rows;
};

const addTopMoviesToDB = async () => {
    try {
        // Fetch genres from the database
        const genreDBList = await fetchGenresFromDB();
        const allMovies = await fetch200Movies();

        // Log the genre list from DB to see the available genres
        console.log("Genre DB List:", genreDBList);

        // Prepare the movie values array for batch insertion
        const movieValues = allMovies.map(movie => [
            movie.tvdb_id,
            movie.title, 
            movie.synopsis, 
            movie.release_date, 
            movie.original_title, 
            movie.original_language, 
            movie.vote_average, 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        ]);

        const insertMoviesQuery = `
            INSERT INTO movies 
            (tvdb_id, title, synopsis, release_date, original_title, original_language, vote_average, poster_path) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING movie_id, tvdb_id, title;
        `;

        const insertMovieGenresQuery = `
            INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES ($1, $2);
        `;

        const batchSize = 50;
        for (let i = 0; i < movieValues.length; i += batchSize) {
            const batch = movieValues.slice(i, i + batchSize);
            
            // Insert each movie one by one in the batch
            for (const movie of batch) {
                const movieRes = await pool.query(insertMoviesQuery, movie);
                const movie_id = movieRes.rows[0].movie_id;
                console.log(`Inserted movie: ${movieRes.rows[0].title}`);

                // Now, insert the genres for this movie
                const movieGenres = allMovies.find(m => m.title === movie[1]).genres; // Get the genres for the current movie based on the title
                for (const genreName of movieGenres) {
                    const genre = genreDBList.find(g => g.name === genreName); // Find the genre_id by name
                    if (genre) {
                        // Insert into movie_genres
                        await pool.query(insertMovieGenresQuery, [movie_id, genre.genre_id]);
                        console.log(`Inserted genre: ${genre.name} for movie: ${movieRes.rows[0].title}`);
                    }
                }
            }
        }

        console.log('Successfully inserted 200 movies and their genres into the database');
    } catch (err) {
        console.error('Error Fetching Movies', err);
    }
};

addTopMoviesToDB();

