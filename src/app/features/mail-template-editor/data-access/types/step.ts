export enum STEP {
  LANGUAGES_SETUP,
  VARIABLES_SETUP,
  PREVIEW,
}

export interface Step {
  id: STEP;
  title: string;
  subTitle?: string;
  icon?: string;
}
