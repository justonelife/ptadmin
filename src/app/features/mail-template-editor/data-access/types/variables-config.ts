export type VariablesConfig = Record<string, Record<string, string>>;
export interface Config {
  languages: string[];
  variables: VariablesConfig;
}
