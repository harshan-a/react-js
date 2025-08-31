import { StatusCodes } from "http-status-codes"

export default function ErrorHandlingMiddleware (err, req, res, next) {
  console.log(err)
  const customError = {
    msg: err.message || "Something went wrong, please try again later...",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  }

  res
    .status(customError.statusCode)
    .json({success: false, msg: customError.msg, err})

}