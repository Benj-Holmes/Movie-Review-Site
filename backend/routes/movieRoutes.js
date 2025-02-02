const { Router } = require('express');
const pool = require('../databaseSetup/db');
const router = Router();

const getTrendingMovies = async(req, res) => {
    // like and desc need to be changed to variables,
    // so we can invert function to dislikes depending on req.body
    pool.query(`SELECT movies.* FROM movie_interactions
        JOIN movies ON movie_interactions.movie_id = movies.movie_id
        WHERE movie_interactions.interaction_type = 'like'
        ORDER BY movie_interactions.interacted_at DESC
        LIMIT 10`,
        (error, results) => {
            if (error) throw error;
            res.send(results.rows);
        })
}

router.get('/trending', getTrendingMovies);

module.exports = router;
