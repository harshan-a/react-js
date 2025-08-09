const CustomError = require("./customError");
const {StatusCodes} = require("http-status-codes");


class ConflictRequest extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictRequest;