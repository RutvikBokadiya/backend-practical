import { ERROR_MESSAGES, STATUS_CODE, SUCCESS_MESSAGES } from "../constant";
import { createToken } from "../utils/authentication";
import { successMiddleware } from "../utils/middleware";
import db from "./../Connection/index";
import { NextFunction, Request, Response, Express } from "express";
import { comparePassword, securePassword } from "../utils/common";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // Find the user by email
    const { email, password } = req.body;
    const user = await db.users.findOne({ where: { email } });

    // If user not found, return error
    if (!user) {
      res.statusCode = STATUS_CODE.BAD_REQUEST;
      throw new Error(ERROR_MESSAGES.EMAIL_NOT_FOUND);
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await comparePassword(password, user.password);

    // If password is invalid, return error
    if (!validPassword) {
      res.statusCode = STATUS_CODE.BAD_REQUEST;
      throw new Error(ERROR_MESSAGES.PASSWORD_EMAIL_NOT_MATCH);
    }

    // Generate a JWT token
    const token = createToken(user);

    // If authentication is successful, return success response
    return successMiddleware(
      {
        message: SUCCESS_MESSAGES.LOGIN_SUCCESSFULLY,
        data: {
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      req,
      res,
      next
    );
  } catch (error) {
    next(error);
  }
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Find the user by email
    const { email, password } = req.body;
    const user = await db.users.findOne({ where: { email } });

    if (user) {
      res.statusCode = STATUS_CODE.BAD_REQUEST;
      throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_TAKEN);
    }

    let hashPass = await securePassword(password); // hashed password
    req.body.password = hashPass; // replace password with hash password
    let users = await db.users.create(req.body);

    // send success response
    return successMiddleware(
      {
        message: SUCCESS_MESSAGES.SUCCESSFULLY_REGISTER,
        data: { user: users.dataValues },
      },
      req,
      res,
      next
    );
  } catch (error) {
    console.log("*error while register user* ", error);
    next(error);
  }
}
