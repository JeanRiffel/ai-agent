AI Agent Starter — Tools, Memory & RAG
TypeScript • Bun • OpenAI • ChromaDB

A fully functional AI Agent built with TypeScript, Bun, OpenAI (GPT-4.1), and ChromaDB, featuring:

🔧 Function-calling tools (calculator, crypto prices, exchange rates)

🧠 Long-term memory using ChromaDB (local vector database)

📚 RAG (Retrieval-Augmented Generation) support

⚙️ Modular architecture with clean separation of tools

🧩 Easy to extend with custom logic, APIs, or smart contracts

This project is perfect for learning AI Agents, vector databases, function calling, and modern LLM architectures.

📂 Project Structure
src/
  agent/
    agent.ts
    tools/
      index.ts
      calculator.tool.ts
      cryptoPrice.tool.ts
      exchangeRate.tool.ts
      memory/
        searchMemory.tool.ts
        addMemory.tool.ts
  memory/
    chroma.ts
  types/
    tool-definition.ts
  server/
    server.ts


This structure follows Single Responsibility Principle (SRP) and is ready for large-scale expansion.

✨ Features
🛠️ 1. Function-Calling Tools

Each tool is fully typed and isolated into its own file. Included tools:

calculator → solves math expressions

cryptoPrice → educational fake crypto price lookup

exchangeRate → mock FX conversions

searchMemory → semantic search in Chroma

addMemory → store user-approved info in long-term memory

Tools use schemas (name, description, parameters) so the LLM knows exactly when to call them.

🧠 2. Long-Term Memory (ChromaDB)

The agent can store, retrieve, and use past experiences:

addMemory({
  text: "I like ETH more than BTC",
  source: "user"
});


Search memory via semantic similarity:

searchMemory({
  query: "What crypto does the user like?"
});

📚 3. RAG — Retrieval-Augmented Generation

The agent retrieves relevant memory before answering:

Semantic search

Inject memories into context

Reduce OpenAI token cost

Improve personalization

🧠 4. Behavioral Rules

The system prompt defines:

Allowed topics

When the agent should use tools

When to store memory

When to avoid sensitive data

No external orchestrator needed — pure OpenAI function calling.

🏁 Getting Started
1. Install dependencies
bun install

2. Start ChromaDB locally
npx chroma serve --path ./chroma-data

3. Start the Agent API
bun run src/server/server.ts


Agent available at:

http://localhost:3000

🧪 Example Usage
Request:
curl -X POST http://localhost:3000/agent \
  -H "Content-Type: application/json" \
  -d '{"message":"Convert 10 USD to BRL"}'

Response:
{
  "rate": 5
}


Or with memory:

{
  "message": "remember this: I prefer ETH"
}

➕ Adding a New Tool

Create:

src/agent/tools/weather.tool.ts


Example:

export const weatherTool = {
  name: "weather",
  description: "Gets the weather for a city.",
  parameters: {
    type: "object",
    properties: { city: { type: "string" } },
    required: ["city"]
  },
  execute: async ({ city }) => {
    return { forecast: "Sunny in " + city };
  }
};


Register in:

src/agent/tools/index.ts


Done.

🧩 Tech Stack

TypeScript

Bun

OpenAI GPT-4.1

ChromaDB

Clean architecture

Function Calling + RAG

📘 What You Learn From This Project

How LLMs decide when to call tools

How to build custom agents without LangChain

How to implement RAG with Chroma

How to give LLMs long-term memory

How to structure real AI engineering projects