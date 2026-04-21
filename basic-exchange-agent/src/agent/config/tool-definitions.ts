import type { ChatCompletionTool } from "openai/resources";
import { tools } from "../tools";

export const TOOL_DEFINITIONS: ChatCompletionTool[] = Object.values(tools).map(
  (tool) => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  })
);
