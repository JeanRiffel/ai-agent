import OpenAI from "openai";
import "dotenv/config";

const apiKey = process.env.OPENAI_API_KEY || Bun?.env?.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

export const openai = new OpenAI({
  apiKey,
});
