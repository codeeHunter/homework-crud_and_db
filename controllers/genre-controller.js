const db = require("../db");
const filmGenre = require("./filmGenre-controller");

class GenreController {
  async createGenre(req, res) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name_genre } = JSON.parse(body);
        const result = await db.query(
          "INSERT INTO genre (name_genre) VALUES ($1) RETURNING *",
          [name_genre]
        );
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

  async getGenre(res, id) {
    try {
      if (id !== undefined) {
        const genre = await db.query(
          `SELECT * FROM genre WHERE genre_id = $1;`,
          [id]
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(genre.rows));
      } else {
        const genres =
          await db.query(`SELECT * FROM genre;`);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(genres.rows));
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Internal server error");
    }
    res.end();
  }

  async updateGenre(req, res, genreId) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name_genre } = JSON.parse(body);
        const query = {
          text: "UPDATE genre SET name_genre = $2 WHERE genre_id = $1 RETURNING *;",
          values: [genreId, name_genre],
        };

        const result = await db.query(query);
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
    });
  }

  async deleteGenreId(res, id) {
    try {
      await filmGenre.deleteGenre(id);

      const deleteFilmQuery = {
        text: 'DELETE FROM genre WHERE genre_id = $1 RETURNING *;',
        values: [id],
      };

      const result = await db.query(deleteFilmQuery);

      if (result.rows.length === 0) {
        throw new Error(`Genre with ID ${genreId} not found.`);
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

module.exports = new GenreController();
