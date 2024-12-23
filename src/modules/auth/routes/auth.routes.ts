import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller";
import { authMiddleware, validateMiddleware } from "../../../shared/middleware";
import { refreshTokenSchema, userLoginSchema, userRegistrationSchema } from "../validations";


const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post("/register", 
    validateMiddleware(userRegistrationSchema, 'body'), 
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.registerUser(req, res, next);
    });

authRouter.post("/login", 
    validateMiddleware(userLoginSchema, 'body'), 
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.loginUser(req, res, next);
    });

authRouter.patch("/refresh-token", 
    validateMiddleware(refreshTokenSchema, 'body'), authMiddleware, 
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.refreshToken(req, res, next);
    });

authRouter.post("/logout", 
    async (req: Request, res: Response, next: NextFunction) => {
        await authController.logOut(req, res, next);
    });

export default authRouter;