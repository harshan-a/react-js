const {
  BadRequest,
  UnauthorizedRequest
} = require("../errors");

async function checkAuthToken (req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.startsWith("Bearer ") && authorization.split(" ")[1];
  req.token = token;
  next();
}


module.exports = checkAuthToken;