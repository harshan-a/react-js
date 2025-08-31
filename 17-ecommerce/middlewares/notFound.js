import { StatusCodes } from "http-status-codes"

export default function notFoundMiddleware (req, res, next) {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({success: false, msg: "404 - route not found"})
}