import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { STEP } from '../types';
import { explicitEffect } from 'ngxtension/explicit-effect';

interface State {
  currentStep: STEP;
  languages: string[];
  variables: Record<string, Record<string, string>>;
}

const initialState: State = {
  currentStep: STEP.LANGUAGES_SETUP,
  languages: ['en'],
  variables: {
    title: {},
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
        variables: {
          ...store.variables(),
          [variable]: store
            .languages()
            .reduce((acc, cur) => ({ ...acc, [cur]: '' }), {}),
        },
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
    updateVariables(value: State['variables']): void {
      patchState(store, { variables: { ...store.variables(), ...value } });
    },
  })),
  withHooks({
    onInit(store) {
      explicitEffect([store.languages], ([_languages]) => {
        const entries = Object.entries(store.variables()).map(
          ([variable, valueInLanguages]) => {
            let newValueInLanguages: Record<string, string> = {};
            _languages.forEach((lang) => {
              if (
                !Object.prototype.hasOwnProperty.call(valueInLanguages, lang)
              ) {
                newValueInLanguages = { ...newValueInLanguages, [lang]: '' };
              } else {
                newValueInLanguages = {
                  ...newValueInLanguages,
                  [lang]: valueInLanguages[lang],
                };
              }
            });

            return [variable, newValueInLanguages];
          }
        );
        patchState(store, { variables: Object.fromEntries(entries) });
      });
    },
  })
);
