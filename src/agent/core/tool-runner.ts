import type { ChatCompletionMessageParam } from "openai/resources";
import { tools } from "../tools";
import { isFunctionToolCall } from "./type-guards";

export async function runTools(toolCalls: any[]): Promise<ChatCompletionMessageParam[]> {
  const messages: ChatCompletionMessageParam[] = [];

  for (const call of toolCalls) {
    if (!isFunctionToolCall(call)) continue;

    const toolName = call.function.name;
    const args = JSON.parse(call.function.arguments);
    const tool = tools[toolName];

    if (!tool) {
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify({ error: `Unknown tool '${toolName}'` }),
      });
      continue;
    }

    const result = await tool.execute(args);

    messages.push({
      role: "tool",
      tool_call_id: call.id,
      content: JSON.stringify(result),
    });
  }

  return messages;
}
