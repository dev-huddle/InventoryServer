import { CustomError } from "./custom.error";
import { StatusCode } from "../constants";

export default class NotAuthorizedError extends CustomError {
  statusCode = StatusCode.UNAUTHORIZED_ERROR;
  metadata;
  constructor(message: string, metadata?: {}) {
    super(message);
    this.metadata = metadata;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
