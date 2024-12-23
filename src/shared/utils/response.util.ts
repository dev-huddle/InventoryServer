import { Response } from "express";

export type ResponseStatus = "error" | "success";

export interface ResponseModel {
    res: Response;
    statusCode?: number;
    status?: ResponseStatus;
    message?: string;
    data?: any;
    metaData?: Record<string, any> | null; // Optional field for extra information like pagination
}

export default function sendResponse({
    res,
    statusCode = 200,
    status = "success",
    message = "Operation successful",
    data = null,
    metaData = null,
}: ResponseModel): Response {
    const response = res.status(statusCode).json({
        status,
        message,
        data,
        ...(metaData ? { metaData } : {}),
    });
    return response;
}