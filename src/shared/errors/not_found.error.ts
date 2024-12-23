import { CustomError } from "./custom.error";
import { StatusCode } from "../constants";

export default class NotFoundError extends CustomError {
  statusCode = StatusCode.NOTFOUND_ERROR;
  metadata;
  constructor(message: string, metadata?: {}) {
    super(message);
    this.metadata = metadata;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
