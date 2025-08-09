const jwt = require("jsonwebtoken");
const {
  UnauthorizedRequest,
} = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token || token === "null") {
    // throw new CustomError({msg: "No token provided", statusCode: 401})
    return next(new UnauthorizedRequest("No token provided"));
  }

  try {
    const payLoad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const { userId, userName } = payLoad;
    req.user = { userId, userName };
    next();

  } catch (err) {
    // console.log(err)
    next(new UnauthorizedRequest(err.message || "Not authorized to this route"));
  }
}

module.exports = authenticationMiddleware;