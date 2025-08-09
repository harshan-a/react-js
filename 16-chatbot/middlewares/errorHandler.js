const { StatusCodes } = require("http-status-codes");

function errorHandlerMiddleware (err, req, res, next) {
  console.log(err);
  const customErrorObject = {
    msg: err.message || "Something went wrong, please try again later...",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }

  if(err.name === "ValidationError") {
    customErrorObject.msg = Object.values(err.errors).map(item => item.message).join(" & ");
    customErrorObject.statusCode = StatusCodes.BAD_REQUEST;
  }

  if(err.code && err.code === 11000) {
    const message = `${
      Object.keys(err.keyValue)[0].charAt(0).toLocaleUpperCase() + Object.keys(err.keyValue)[0].split("").slice(1, ).join("")
    } is already exists`
    customErrorObject.msg = message;
    customErrorObject.statusCode = StatusCodes.BAD_REQUEST;
  }

  res
    .status(customErrorObject.statusCode)
    .json({msg: customErrorObject.msg, err});
}

module.exports = errorHandlerMiddleware;