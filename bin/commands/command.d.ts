export interface Command {
  name: string;
  description: string;
  action: Action;
  arguments: CommandArgumet[],
  options: CommandOption[],
}

export type CommandArgumet = [string, string?, unknown?];

export type CommandOption = [string, string, string?]

export type Action = (...options: any[]) => Promise<void>;

export interface FolderOptions {
  multi?: boolean;
  deep?: number;
}

export interface CheckoutOptions {
  b?: boolean;
  B?: boolean;
  orphan?: boolean;
}

export type Action = (...options: any[]) => Promise<void>;