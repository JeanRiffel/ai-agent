import type { ToolDefinition } from "../../types/tool-definition";

import { calculatorTool } from "./calculator.tool";
import { cryptoPrice } from "./crypto-price.tool";
import { exchangeRate } from "./exchange-rate.tool";
import { searchMemory } from "./memory/search-memory.tool";
import { addMemory } from "./memory/add-memory.tool";

export const tools: Record<string, ToolDefinition> = {
  calculator: calculatorTool,
  cryptoPrice: cryptoPrice,
  exchangeRate: exchangeRate,
  searchMemory: searchMemory,
  addMemory: addMemory,
};
