const filmController = require("./controllers/film-controller");
const genreController = require("./controllers/genre-controller");

const router = async (req, res, id, pathname) => {
  if (req.method === "GET" && pathname === "/films") {
    await filmController.getFilms(res, id);
  } else if (req.method === "GET" && pathname === "/genres") {
    await genreController.getGenre(res, id);
  } else if (req.method === "POST" && pathname === "/create_film") {
    await filmController.createFilm(req, res);
  } else if (req.method === "POST" && pathname === "/create_genre") {
    await genreController.createGenre(req, res);
  } else if (req.method === "PUT" && pathname === `/update_film`) {
    await filmController.updateFilm(req, res, id);
  } else if (req.method === "PUT" && pathname === `/update_genre`) {
    await genreController.updateGenre(req, res, id);
  } else if (req.method === "DELETE" && pathname === `/delete_film`) {
    await filmController.deleteFilmId(res, id);
  } else if (req.method === "DELETE" && pathname === `/delete_genre`) {
    await genreController.deleteGenreId(res, id);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not found");
    res.end();
  }
};

module.exports = router