
import { ERROR_MESSAGES, STATUS_CODE, SUCCESS_MESSAGES } from "../constant";
import { successMiddleware } from "../utils/middleware";
import { NextFunction, Request, Response, Express } from "express";
import { comparePassword, getAIClient, securePassword } from "../utils/common";


export async function getChatFromAI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let client = getAIClient();
    // Choose a model that's appropriate for your use case.
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);
    if (!result || !result.response) {
      throw new Error(`Sorry.please try after sometime`);
    }

    const text = result.response.text();

    // send success response
    return successMiddleware(
      {
        message: SUCCESS_MESSAGES.COMMON.FETCH_SUCCESS.replace(
          ":attribute",
          "chat"
        ),
        data: { completion: text },
      },
      req,
      res,
      next
    );

  } catch (error) {
    next(error);
  }
}
