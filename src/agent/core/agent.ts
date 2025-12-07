import OpenAI from "openai";
import { tools } from "../tools";
import type { ToolDefinition } from "../../types/tool-definition";
import type {  
  ChatCompletionMessageToolCall,
  ChatCompletionMessageFunctionToolCall,
  ChatCompletionTool,
} from "openai/resources";
import "dotenv/config";
import type { ChatCompletionMessageParam } from "openai/resources";

const apiKey = process.env.OPENAI_API_KEY || Bun?.env?.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

const client = new OpenAI({
  apiKey,
});

function isFunctionToolCall(
  call: ChatCompletionMessageToolCall
): call is ChatCompletionMessageFunctionToolCall {
  return call.type === "function";
}

export async function runAgent(userMessage: string) {
  const toolValues: ToolDefinition[] = Object.values(tools);

  const toolDefs: ChatCompletionTool[] = toolValues.map((tool) => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  }));

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: `
        You are a Tool Agent with memory capabilities.

        PRIMARY DOMAIN RULES:
        - Your main job is to answer ONLY math operations and crypto price questions.
        - For anything outside that domain, respond:
          "I can only answer math or crypto price questions."

        MEMORY RULES:
        1. If the user explicitly says “remember this”, “save this”, “store this”, 
          or clearly wants information stored, call addMemory with the provided text.

        2. If the user asks something that could be answered from stored memory 
          (“What did I say earlier?”, “What do you know about X?”, “What’s my preference?”),
          then call searchMemory BEFORE answering.

        3. If searchMemory returns results, use them directly without asking the model again
          (to avoid cost).

        4. Do NOT store personal or sensitive information unless the user clearly requests it.

        5. Do NOT store or retrieve memory unless one of the rules above applies.

      `},
      { role: "user", content: userMessage },
    ],
    tools: toolDefs,
    tool_choice: "auto",
  });

  const choice = response.choices?.[0];
  if (!choice || !choice.message) {
    throw new Error("OpenAI response did not contain a message.");
  }

  const message = choice.message;

  if (message.tool_calls?.length) {
    
    const toolMessages: ChatCompletionMessageParam[] = [];

    for (const call of message.tool_calls) {
      if (!isFunctionToolCall(call)) continue;

      const toolName = call.function.name;
      const args = JSON.parse(call.function.arguments);
      const tool = tools[toolName];

      if (!tool) {
        toolMessages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify({
            error: `Tool '${toolName}' not found`,
          }),
        });
        continue;
      }

      const toolResult = await tool.execute(args);     

      toolMessages.push({
        role: "tool",                
        tool_call_id: call.id,
        content: JSON.stringify(toolResult),
      });
    }

    const final = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are an AI agent." },
        { role: "user", content: userMessage },
        message,
        ...toolMessages,
      ],
    });

    const finalChoice = final.choices?.[0];
    return finalChoice?.message?.content ?? "No final message produced.";
  }
  return message.content ?? "No output.";
}
