import { Pipe, PipeTransform } from '@angular/core';
import {
  DYNAMIC_TYPE,
  FieldData,
  RecordDynamicField,
} from '@libs/lib-controller';
import { LANGUAGES } from '../constants';

@Pipe({
  name: 'variableCardLanguageInputs',
})
export class VariableCardLanguageInputs implements PipeTransform {
  transform(languages: string[]): RecordDynamicField {
    return languages.reduce((acc, cur) => {
      const label = LANGUAGES.find((item) => item.value === cur)?.label || '';
      return {
        ...acc,
        [cur]: {
          label,
          type: DYNAMIC_TYPE.TEXTAREA,
          withWrapper: false,
          styleClass: 'col-span-12',
          inputs: {
            rows: 1,
          },
        } as FieldData,
      };
    }, {});
  }
}
