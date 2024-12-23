import { CustomError } from "./custom.error";
import { StatusCode } from "../constants";

export default class NotModifiedError extends CustomError {
  statusCode = StatusCode.NOT_MODIFIED;
  metadata;
  constructor(message: string, metadata?: {}) {
    super(message);
    this.metadata = metadata;
    Object.setPrototypeOf(this, NotModifiedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
