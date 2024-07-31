const router = require("express").Router();
import { getChatFromAI } from "../controller/chatController";
import { authMiddleware } from "../utils/middleware";
import { chatValidation } from "../validation/validate";

/**
 * @typedef getChatFromAI
 * @property {string} prompt
 */
/**
 * @group User - User Role
 * For getChatFromAI
 * @route POST /api/openai/chats
 * @param {getChatFromAI.model} getChatFromAI.body.required
 * @returns {object} 200 - Successfull
 * @returns {Error} Error - Unexpected
 */
router.post("/chats", chatValidation, authMiddleware, getChatFromAI);

export = router;
