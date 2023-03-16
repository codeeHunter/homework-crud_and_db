const db = require("../db");
const filmGenreController = require("./filmGenre-controller");

class FilmController {
  async createFilm(req, res) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        // Жанры прилетают массивом
        const { title, year_of_production, genres_id } = JSON.parse(body);
        const result = await db.query(
          "INSERT INTO film (title, year_of_production) VALUES ($1, $2) RETURNING *",
          [title, year_of_production]
        );
        const film_id = result.rows[0].film_id;
        if (genres_id.length > 0)
          filmGenreController.addFilmGenre(film_id, genres_id);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result.rows[0]));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal server error");
      }
      res.end();
    });
  }

  async getFilms(res, id) {
    try {
      if (id !== undefined) {
        const film = await db.query(
          `SELECT f.title, array_agg(g.name_genre) AS genres
          FROM film f
          JOIN film_genre fg ON f.film_id = fg.film_id
          JOIN genre g ON fg.genre_id = g.genre_id
          WHERE f.film_id = $1
          GROUP BY f.title;`,
          [id]
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(film.rows));
      } else {
        const films =
          await db.query(`SELECT f.title, string_agg(g.name_genre, ', ') AS genres
          FROM film f
          JOIN film_genre fg ON f.film_id = fg.film_id
          JOIN genre g ON fg.genre_id = g.genre_id
          GROUP BY f.title;`);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(films.rows));
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Internal server error");
    }
    res.end();
  }

  async updateFilm(req, res, filmId) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { title, year_of_production } = JSON.parse(body);
        const query = {
          text: "UPDATE film SET title = $2, year_of_production = $3 WHERE film_id = $1 RETURNING *;",
          values: [filmId, title, year_of_production],
        };

        const result = await db.query(query);
        if (result.rows.length === 0) {
          throw new Error(`Film with ID ${filmId} not found.`);
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result.rows[0]));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal server error");
      }
      res.end();
    });
  }

  async deleteFilmId(res, id) {
    try {
      await filmGenreController.deleteFilm(id);

      const deleteFilmQuery = {
        text: 'DELETE FROM film WHERE film_id = $1 RETURNING *;',
        values: [id],
      };

      const result = await db.query(deleteFilmQuery);

      if (result.rows.length === 0) {
        throw new Error(`Film with ID ${genreId} not found.`);
      }
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result.rows[0]));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Internal server error");
    }
    res.end();
  }
}

module.exports = new FilmController();
