const router = require("express").Router();
import { login, registerUser } from "../controller/user";
import { loginValidation, registerValidation } from "../validation/validate";
import db from "./../Connection/index";
import { NextFunction, Request, Response, Express } from "express";

/**
 * @typedef login
 * @property {string} email
 * @property {string} password
 */
/**
 * @group User - User Role
 * For login
 * @route POST /api/user/login
 * @param {login.model} login.body.required
 * @returns {object} 200 - Successfull
 * @returns {Error} Error - Unexpected
 */
router.post("/login", loginValidation, login);

/**
 * @typedef registerUser
 * @property {string} email
 * @property {string} password
 * @property {string} name
 */
/**
 * @group User - User Role
 * For register
 * @route POST /api/user/register
 * @param {registerUser.model} registerUser.body.required
 * @returns {object} 200 - Successfull
 * @returns {Error} Error - Unexpected
 */
router.post("/register", registerValidation, registerUser);

export = router;
