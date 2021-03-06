CREATE TABLE IF NOT EXISTS games (
    id VARCHAR(100)  PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    number_of_likes INT DEFAULT 0 NOT NULL,
    number_of_plays INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS trending_games (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    game_id VARCHAR(100) UNIQUE NOT NULL,
    trend_index INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
