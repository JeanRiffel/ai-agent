import type { ToolDefinition } from "../../types/tool-definition";

export const exchangeRate: ToolDefinition = {
  name: "exchangeRate",
  description: "Returns educational fake exchange rates between currencies.",
  parameters: {
    type: "object",
    properties: {
      from: { type: "string" },
      to: { type: "string" },
    },
    required: ["from", "to"],
  },
  execute: async ({ from, to }) => {
    console.log('I tried to exchange  ', from, ' to ', to);

    const rates: Record<string, Record<string, number>> = {
      USD: { EUR: 0.85, JPY: 110 },
      EUR: { USD: 1.18, JPY: 129 },
      JPY: { USD: 0.0091, EUR: 0.0077 },
      BRL: { USD: 0.20, EUR: 0.17 },
    };
      
    const rate = rates[from]?.[to] ?? null;
    return { rate };
  }    
}
