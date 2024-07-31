let v4 = require("uuid");
import * as bcrypt from "bcrypt";
const aiAPiKey = `${process.env.AI_API_KEY}`;
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const client = new GoogleGenerativeAI(aiAPiKey);

export function generateUUID() {
  return v4.v4();
}

export async function securePassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, userPass: string) {
  return await bcrypt.compare(password, userPass);
}

export function getAIClient() {
  return client;
}
