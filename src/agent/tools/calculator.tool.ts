import type { ToolDefinition } from "../config/tool-definitions";

export const calculatorTool: ToolDefinition = {  
    name: "calculator",
    description: "Perform a math expression like '12 * 55'.",
    parameters: {
      type: "object",
      properties: {
        expression: { type: "string" },
      },
      required: ["expression"],
    },
    execute: async ({ expression }) => {
      console.log('Calculator tool called with expression:', expression);
      try {
        return { result: eval(expression) };
      } catch {
        return { error: "Invalid expression" };
      }
    },
  }