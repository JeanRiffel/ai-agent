export type ToolDefinition = {
  name: string;
  description: string;
  parameters: any;
  execute: (args: any) => Promise<any>;
};
