const http = require("http");
const PORT = 8080;
const url = require("url");
const routes = require("./routes");

http
  .createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const { id } = parsedUrl.query;
    routes(req, res, id, pathname);
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} `);
  });
