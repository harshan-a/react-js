const [
  BadRequest,
  UnauthorizedRequest,
] = [require('./badRequest'), require("./unauthorizedRequest")];

module.exports = {
  BadRequest, UnauthorizedRequest
}