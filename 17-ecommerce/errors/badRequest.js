import { StatusCodes } from "http-status-codes"


export default class BadRequest extends Error {
  constructor(msg) {
    super(msg)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
