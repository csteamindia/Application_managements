import {
  BadRequestError,
  ApiError,
  Crypto,
  ErrorController,
  SuccessResponse,
} from "../core/index";
import { Request, Response, NextFunction } from "express";
// import { TokenValidate } from './tokenValidate';
const crypto = new Crypto();
const jwt = require("jsonwebtoken");
const EC = new ErrorController();
// const TV = new TokenValidate();

export interface AppRequest extends Request {
  authorization: string;
  email: string,
  role: string;
}

module.exports = async function (
  req: AppRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let reqHeader: any = req.headers.authorization;
    if (reqHeader) {
      const token = reqHeader.split(" ");
      const verified = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
      if (verified) {
        req.role = verified.role;
        req.email = verified.email;
        return next();
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("Token is required");
    }
  } catch (error: any) {
    // Access Denied
    ApiError.handle(new BadRequestError(error.message), res);
  }


};

