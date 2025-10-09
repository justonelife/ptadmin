import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { STEP } from '../types';

interface State {
  currentStep: STEP;
  languages: string[];
  variables: Record<string, Record<string, string>>;
}

const initialState: State = {
  currentStep: STEP.LANGUAGES_SETUP,
  languages: ['en'],
  variables: {
    header_title: {},
    greeting: {
      en: 'Hello!',
    },
  },
};

export const Store = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setStep(step: STEP): void {
      patchState(store, { currentStep: step });
    },
    addLanguage(language: string): void {
      if (store.languages().includes(language)) return;
      patchState(store, { languages: [...store.languages(), language] });
    },
    removeLanguageAt(index: number): void {
      if (index < 0 || index >= store.languages().length) return;
      store.languages().splice(index, 1);
      patchState(store, { languages: [...store.languages()] });
    },
    addVariable(variable: string): void {
      if (!variable || store.variables()[variable]) return;
      patchState(store, {
        variables: { ...store.variables(), [variable]: {} },
      });
    },
    removeVariable(key: string): void {
      delete store.variables()[key];
    },
    goNextStep(): void {
      patchState(store, { currentStep: store.currentStep() + 1 });
    },
    goPreviousStep(): void {
      patchState(store, { currentStep: store.currentStep() - 1 });
    },
  }))
);
