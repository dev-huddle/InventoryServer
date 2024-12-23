import { CustomError } from "./custom.error";
import { StatusCode } from "../constants";

export default class BadRequestError extends CustomError {
    statusCode = StatusCode.BADREQUEST_ERROR;
    metadata;
    constructor(message: string, metadata?: {}) {
        super(message);
        this.metadata = metadata;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
