CREATE TABLE person (
    person_id SERIAL PRIMARY KEY,
    pos varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL
);

CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title varchar(50) NOT NULL,
    year_of_production int NOT NULL,
    budget int,
    marketing int,
    duration_time int,
    country varchar(50) NOT NULL,
    fees_usa int,
    fees_world int,
    fkey_editor_id int REFERENCES person(person_id) NOT NULL,
    fkey_composer_id int REFERENCES person(person_id) NOT NULL,
    fkey_operator_id int REFERENCES person(person_id) NOT NULL,
    fkey_writer_id int REFERENCES person(person_id) NOT NULL,
    fkey_producer_id int REFERENCES person(person_id) NOT NULL,
    fkey_director_id int REFERENCES person(person_id) NOT NULL
);

CREATE TABLE genre (
    genre_id SERIAL PRIMARY KEY,
    name_genre varchar(50) NOT NULL
);

CREATE TABLE audience (
    audience_id SERIAL PRIMARY KEY,
    country varchar(64),
    quantity int
);

CREATE TABLE film_artist (
    film_id int REFERENCES film(film_id),
    person_id int REFERENCES person(person_id),
    CONSTRAINT film_person_pkey PRIMARY KEY (film_id, person_id)
);

CREATE TABLE film_genre (
    film_id int REFERENCES film(film_id),
    genre_id int REFERENCES genre(genre_id),
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id)
);