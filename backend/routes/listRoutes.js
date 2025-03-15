const { Router } = require('express');
const pool = require('../databaseSetup/db');
const router = Router();


// This route selects 4 random lists from the DB to populate the 'trending' list on the homepage.
const getTrendingLists = async(req, res) => {
    pool.query(`WITH random_lists AS (
        SELECT list_id, list_name, list_description
        FROM user_lists
        ORDER BY RANDOM()
        LIMIT 4
        )
        SELECT 
            rl.list_id,
            rl.list_name,
            rl.list_description,
            m.movie_id,
            m.title,  
            m.poster_path 
        FROM random_lists rl
        JOIN user_list_movies ulm ON rl.list_id = ulm.list_id
        JOIN movies m ON ulm.movie_id = m.movie_id
        ORDER BY rl.list_id, m.title;`,
        (error, results) => {
            if (error) throw error;
            res.send(results.rows);
        })
    
}


router.get('/list', getTrendingLists);

module.exports = router;