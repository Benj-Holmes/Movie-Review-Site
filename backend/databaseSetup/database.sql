-- Basic Data Tables

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
    achievement_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    tvdb_id INT UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,
    release_date DATE,
    original_title VARCHAR(255),
    original_language VARCHAR(5),
    vote_average DECIMAL(3, 1),
    poster_path TEXT
);

CREATE TABLE directors (
    director_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 10),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-Many Relationship Tables Below:

CREATE TABLE movie_directors (
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    director_id INT REFERENCES directors(director_id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, director_id)
);

CREATE TABLE movie_genres (
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE user_lists (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    list_name VARCHAR(50) NOT NULL,
    list_description VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id)
);

CREATE TABLE review_interactions (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE,
    interaction_type VARCHAR(10) CHECK (interaction_type IN ('like', 'dislike')),
    interacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, review_id)
);

CREATE TABLE movie_interactions (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    interaction_type VARCHAR(10) CHECK (interaction_type IN ('like', 'dislike')),
    interacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_id)
);

CREATE TABLE user_achievements (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    achievement_id INT REFERENCES achievements(achievement_id) ON DELETE CASCADE,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id)
);