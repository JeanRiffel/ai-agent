import type {  
  ChatCompletionMessageToolCall,
  ChatCompletionMessageFunctionToolCall,
  ChatCompletionTool,
} from "openai/resources";


export function isFunctionToolCall(
  call: ChatCompletionMessageToolCall
): call is ChatCompletionMessageFunctionToolCall {
  return call.type === "function";
}
