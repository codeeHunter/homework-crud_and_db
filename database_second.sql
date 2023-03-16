CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title varchar(50) NOT NULL,
    year_of_production int NOT NULL
);

CREATE TABLE genre (
    genre_id SERIAL PRIMARY KEY,
    name_genre varchar(50) NOT NULL
);

CREATE TABLE film_genre (
    film_id int REFERENCES film(film_id),
    genre_id int REFERENCES genre(genre_id),
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id)
);