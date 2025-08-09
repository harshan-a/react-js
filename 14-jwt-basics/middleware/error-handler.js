const {StatusCodes} = require("http-status-codes");


const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  const errorObject = {
    msg: err.message || "Something went wrong, please try again later...",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(" & ")
    errorObject.msg = message;
    errorObject.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    // return res
    //   .status(StatusCodes.UNPROCESSABLE_ENTITY)
    //   .json({msg: message || "Something error on validation...", err});
    // console.log(Object.values(err.errors)[0].message);
  }
  if (err.code && err.code === 11000) {
    errorObject.msg = Object.keys(err.keyValue) + " not available, try something new!!";
    errorObject.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
  if (err.name === "CastError") {
    errorObject.msg = `No item found with id ${err.value}`
    errorObject.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }

  // console.log(err);

  res
    .status(errorObject.statusCode)
    .json({msg: errorObject.msg, err});
}

module.exports = errorHandlerMiddleware;