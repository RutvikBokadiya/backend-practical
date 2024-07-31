import { Request } from "express";

export interface UserModel {
  id: number;
  uuid: string;
  name: string;
  email: string;
  mobile: number;
  password:string;
  createdAt: Date;
}

export interface RequestWithUser extends Request {
  user: UserModel;
}
export interface DataStoredInToken {
  id: string;
}
