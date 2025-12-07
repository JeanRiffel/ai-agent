import type { ToolSchema } from "../../types/tool-schema";

import { calculatorTool } from "./calculator.tool";
import { cryptoPrice } from "./crypto-price.tool";
import { exchangeRate } from "./exchange-rate.tool";
import { searchMemory } from "./memory/search-memory.tool";
import { addMemory } from "./memory/add-memory.tool";

export const tools: Record<string, ToolSchema> = {
  calculator: calculatorTool,
  cryptoPrice,
  exchangeRate,
  searchMemory,
  addMemory,
};
