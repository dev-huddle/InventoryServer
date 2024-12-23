import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors";
import { verifyToken } from "../utils";
import { env } from "../../environment";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization?.split(" ")[1]; 

  try {
    if (!accessToken) {
      throw new NotAuthorizedError("Failed to find token");
    }

    const decoded = await verifyToken(accessToken, env.JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.id) {
      throw new NotAuthorizedError("Invalid token payload");
    }

    req.user = { id: decoded.id };

    next(); 
  } catch (err: any) {
    next(err); 
  }
};
