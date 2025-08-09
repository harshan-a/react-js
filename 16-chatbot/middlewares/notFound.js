const { StatusCodes } = require("http-status-codes");

function notFoundMiddleware (req, res) {
  res
    .status(StatusCodes.NOT_FOUND)
    .send("<h1>404-page not found</h1>");
}

module.exports = notFoundMiddleware;