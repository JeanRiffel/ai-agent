import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient("http://localhost:8000");

export async function getCollection() {
  return chroma.getOrCreateCollection({
    name: "agent_memory",
    metadata: { description: "Long-term memory for my agent" },
  });
}
