import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import {
  UserModel,
  RequestWithUser,
  DataStoredInToken,
} from "../interface/userModel";
import db from "../Connection";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  STATUS_CODE,
  USER_CONSTANT,
} from "../constant";

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<boolean> {
  try {
    // const User = UserModel;
    const req = request as RequestWithUser;
    const secret = String(process.env.SECRET);
    const authHeader =
      req.headers.authorization || req.headers["x-access-token"] as string;
      
    const verificationResponse = jwt.verify(
      authHeader,
      secret
    ) as DataStoredInToken;
    const _id = verificationResponse.id;
    const user = await db.users.findOne({
      where: {
        id: _id,
      },
    });

    if (!user) {
      response.statusCode = STATUS_CODE.FORBIDDEN;
      throw new Error(ERROR_MESSAGES.TOKEN_EXPIRED);
    }

    req.user = user;
    next();
    return true;
  } catch (error) {
    next(error);
    return false;
  }
}

interface ErrorHttpException {
  status?: number;
  message?: string;
}

export const errorMiddleware = (
  error: ErrorHttpException,
  request: Request,
  response: Response,
  next: NextFunction
): boolean => {
  const statusCode =
    response.statusCode || error.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
  response.status(statusCode).send({
    message,
    status: ERROR_MESSAGES.ERROR,
    success: false,
    statusCode,
  });
  return false;
};

interface SuccessHttpException {
  status?: number;
  message?: string;
  data: any;
}

export const successMiddleware = (
  success: SuccessHttpException,
  request: Request,
  response: Response,
  next: NextFunction
): boolean => {
  const statusCode = success.status || STATUS_CODE.OK;
  const message = success.message || SUCCESS_MESSAGES.SUCCESSFUL;
  response.status(statusCode).send({
    message,
    status: SUCCESS_MESSAGES.SUCCESS,
    statusCode,
    success: true,
    data: success.data,
  });
  return false;
};
