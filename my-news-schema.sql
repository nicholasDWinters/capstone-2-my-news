CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1)
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
    source TEXT NOT NULL,
    date VARCHAR(75) NOT NULL,
    author VARCHAR(75) NOT NULL,
    title VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    content TEXT NOT NULL
);