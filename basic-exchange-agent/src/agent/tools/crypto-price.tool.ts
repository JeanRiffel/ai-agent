import type { ToolDefinition } from "../config/tool-definitions";

export const  cryptoPrice: ToolDefinition = {
  name: "cryptoPrice",
  description: "Returns educational fake crypto prices.",
  parameters: {
    type: "object",
    properties: {
      ticker: { type: "string" },
    },
    required: ["ticker"],
  },
  execute: async ({ ticker }) => {
    console.log('Crypto price tool called with ticker:', ticker);

    const prices: Record<string, number> = {
      BTC: 100000,
      ETH: 5000,
      SOL: 200,
    };

    return { price: prices[ticker.toUpperCase()] ?? null };
  },
};