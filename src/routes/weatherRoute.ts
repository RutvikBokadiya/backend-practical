const router = require("express").Router();
import { getWeather } from "../controller/weatherController";
import { weatherValidation } from "../validation/validate";
import { authMiddleware } from "../utils/middleware";

/**
 * @typedef getWeather
 * @property {string} city
 */
/**
 * @group User - User Role
 * For getWeather
 * @route POST /api/weather/getWeather
 * @param {sendMessage.model} sendMessage.body.required
 * @returns {object} 200 - Successfull
 * @returns {Error} Error - Unexpected
 * @security User
 */
router.post("/getWeather", weatherValidation, authMiddleware, getWeather);

export = router;
