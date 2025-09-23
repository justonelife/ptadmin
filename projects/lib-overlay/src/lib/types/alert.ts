export interface Alert {
  icon?: string;
  title: string;
  message?: string;
  lifetime?: number | null; //in miliseconds; null mean not auto disappear
  closable?: boolean;
}
