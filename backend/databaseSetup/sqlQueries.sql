-- Return 10 most recently 'liked' movies
SELECT 
    movies.*
FROM 
    movie_interactions
JOIN 
    movies
ON 
    movie_interactions.movie_id = movies.movie_id
WHERE 
    movie_interactions.interaction_type = 'like'
ORDER BY 
    movie_interactions.interacted_at DESC
LIMIT 10;

-- Select 4 Random lists, and then join them with Movies and List data (Aliases)
WITH random_lists AS (
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
ORDER BY rl.list_id, m.title;