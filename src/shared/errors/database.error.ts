import { StatusCode } from "../constants";
import { CustomError } from "./custom.error";

export class DatabaseError extends CustomError {
    statusCode = StatusCode.SERVER_ERROR;
    message = "oops something went wrong with database connection";
    constructor() {
        super("oops something went wrong with database connection");

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
