import { StatusCodes } from "http-status-codes"


export default class NotFoundError extends Error {
  constructor(msg) {
    super(msg)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}