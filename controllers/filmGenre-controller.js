const db = require("../db");

class FilmGenreController {
  async addFilmGenre(film_id, genres_id) {
    let into = "INSERT INTO film_genre (film_id, genre_id) values ";

    genres_id?.map((genre, index) => {
      into += `(${film_id}, ${genre})`;
      if (index != genres_id.length - 1) into += ",";
    });

    await db.query(into);
  }

  async deleteFilm(id) {
    const query = `DELETE FROM film_genre WHERE film_id = ${id}`;

    await db.query(query);
  }

  async deleteGenre(id) {
    const query = `DELETE FROM film_genre WHERE genre_id = ${id}`;

    await db.query(query);
  }
}

module.exports = new FilmGenreController();
