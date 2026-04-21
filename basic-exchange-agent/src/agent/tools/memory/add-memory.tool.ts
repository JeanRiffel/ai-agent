import type { ToolDefinition } from "../../config/tool-definitions";
import { getCollection } from "../../memory/chroma";

export const addMemory: ToolDefinition = {
  name: "addMemory",
  description: "Stores information into long-term memory",
  parameters: {
    type: "object",
    properties: {
      text: { type: "string" },
      source: { type: "string" },
    },
    required: ["text"],
  },

  execute: async ({ text, source }) => {
    const collection = await getCollection();

    await collection.add({
      ids: [crypto.randomUUID()],
      documents: [text],
      metadatas: [{ source: source ?? "unknown" }],
    });

    return { status: "success" };
  },
}