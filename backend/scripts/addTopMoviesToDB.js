const pool = require('../databaseSetup/db');
const fetch200Movies = require('./fetchTop200Movies');

/* 
    Returns an array of objects with ID and Name, so we can correctly insert the
    genres of fetched films to many-to-many table movie_genres 
*/
const fetchGenresFromDB = async () => {
    const result = await pool.query('SELECT * FROM genres');
    return result.rows;
};

// Adds 200 Top Movies from API to our database, in two tables, Movies and Movie_genres
const addTopMoviesToDB = async () => {
    try {
        const genreDBList = await fetchGenresFromDB();
        const allMovies = await fetch200Movies();

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

        /* 
            In this block we iterate over each movie in a batch, insert it into the database, 
            then log this to the console. Then, using the title of the movie, we look up the genres
            which were returned from the API, then we match those against the genres in our database
            so we can update our movie_genres table.
        */

        const batchSize = 50;
        for (let i = 0; i < movieValues.length; i += batchSize) {
            const batch = movieValues.slice(i, i + batchSize);
            
            for (const movie of batch) {
                const movieRes = await pool.query(insertMoviesQuery, movie);
                const movie_id = movieRes.rows[0].movie_id;
                console.log(`Inserted movie: ${movieRes.rows[0].title}`);

                const movieGenres = allMovies.find(m => m.title === movie[1]).genres;
                for (const genreName of movieGenres) {
                    const genre = genreDBList.find(g => g.name === genreName); 
                    if (genre) {
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

