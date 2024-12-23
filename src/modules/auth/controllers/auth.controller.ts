import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import { sendResponse } from "../../../shared/utils";
import { StatusCode } from "../../../shared/constants";

@injectable()
export default class AuthController {
    constructor(
        private authService: AuthService
    ){

    }

    async registerUser(req: Request, res: Response, next: NextFunction){
        try {

            await this.authService.register(req.body);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.CREATED,
                message: "successfully created account"
            });
        } catch (err: any) {
            next(err);
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction){
        try {

            const response = await this.authService.login(req.body);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.OK,
                message: "successfully authenticated account",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction){
        try {

            const response = await this.authService.refreshToken(req.body);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.OK,
                message: "successfully refreshed user authentication",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }

    async logOut(req: Request, res: Response, next: NextFunction){
        try {

            const { id } = req.user;

            const response = await this.authService.logout(id);

            sendResponse({
                res,
                status: "success",
                statusCode: StatusCode.OK,
                message: "successfully logged user offline",
                data: response
            });
        } catch (err: any) {
            next(err);
        }
    }
}