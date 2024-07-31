import { UserModel } from "../interface/userModel";
import * as jwt from "jsonwebtoken";
let JWT_SECRET = String(process.env.SECRET);

interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  id: number;
}

export function createToken(user: UserModel): TokenData {
  const expiresIn = Number(process.env.expireToken) || 24 * 60 * 60;
  // const expiresIn = 5 * 60; // 5 minutes temporary for test
  const dataStoredInToken: DataStoredInToken = {
    id: user.id,
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, JWT_SECRET, { expiresIn }),
  };
}
