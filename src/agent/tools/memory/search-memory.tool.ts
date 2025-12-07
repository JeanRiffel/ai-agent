import type { ToolDefinition } from "../../config/tool-definitions";
import { getCollection } from "../../memory/chroma";

export const searchMemory: ToolDefinition = {
  name: "searchMemory",
  description: "Performs semantic search in the agent memory",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string" },
      limit: { type: "number" },
    },
    required: ["query"],
  },

  execute: async ({ query, limit = 3 }) => {
    const collection = await getCollection();

    const result = await collection.query({
      nResults: limit,
      queryTexts: [query],
    });

    return result;
  },
}