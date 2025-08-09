const { StatusCodes } = require("http-status-codes");

class UnauthorizedRequest extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedRequest;