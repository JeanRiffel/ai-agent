import type { ChatCompletionTool } from "openai/resources";
import { TOOL_DEFINITIONS } from "./config/tool-definitions";
import { SYSTEM_PROMPT } from "./config/system-prompt";
import { MODEL_NAME } from "./config/model";
import { openai } from "./core/openai-client";
import { runTools } from "./core/tool-runner";

export async function runAgent(userMessage: string) {
  const toolDefs: ChatCompletionTool[] = TOOL_DEFINITIONS;

  const initial = await openai.chat.completions.create({
    model: MODEL_NAME,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    tools: toolDefs,
    tool_choice: "auto",
  });

  const choice = initial.choices?.[0];
  if (!choice?.message) throw new Error("Empty model response");

  const message = choice.message;
  
  if (message.tool_calls?.length) {
    const toolResults = await runTools(message.tool_calls);

    const final = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: "You are an AI agent." },
        { role: "user", content: userMessage },
        message,
        ...toolResults,
      ],
    });

    return final.choices?.[0].message?.content ?? "No final message.";
  }
  return message.content ?? "No output.";
}
