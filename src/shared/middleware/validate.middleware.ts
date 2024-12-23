import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../utils";
import { StatusCode } from "../constants";

export const validateMiddleware = (schema: Joi.ObjectSchema, target: 'body' | 'query' | 'params' = 'body') => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req[target]);

        if (error) {
            sendResponse({
                res,
                status: "error",
                statusCode: StatusCode.BADREQUEST_ERROR,
                message: error.details[0].message,
            });
            return;
        }

        next();
    };
};
