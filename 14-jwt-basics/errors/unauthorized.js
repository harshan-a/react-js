const CustomError = require("./customError");
const {StatusCodes} = require("http-status-codes");


class UnauthorizedRequest extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedRequest;