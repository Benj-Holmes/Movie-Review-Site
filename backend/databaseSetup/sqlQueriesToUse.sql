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
