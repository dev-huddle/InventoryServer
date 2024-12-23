import { container } from "tsyringe";
import { CustomError } from "./custom.error";
import { StatusCode } from "../constants";

export default class InternalServerError extends CustomError {
    statusCode = StatusCode.SERVER_ERROR;
    metadata;
    constructor(message: string, metadata?: {}) {
        super(message);
        this.metadata = metadata;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
