const jwt = require("jsonwebtoken");

const {
  BadRequest,
  UnauthorizedRequest
} = require("../errors");

async function authMiddleware (req, res, next) {
  const { token } = req;
  if(!token) 
    throw new BadRequest("Token not found");

  try {
    const payLoad = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const { userId, userName } = payLoad;
    req.user = { userId, userName };
    next();

  } catch(err) {
    next(new UnauthorizedRequest("Unauthorized access. " + err.message || ""));
  }
}


module.exports = authMiddleware;