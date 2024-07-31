import { Request, Response, NextFunction } from "express";
import { loginValidator, registerValidator } from "./validateUsers";
import { getWeatherValidator } from "./weatherValidator";
import { getChatValidator } from "./newsValidator";

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const weatherValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = getWeatherValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const chatValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = getChatValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// export const validateUpdateMessage = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { error } = updateMessageValidator.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };
