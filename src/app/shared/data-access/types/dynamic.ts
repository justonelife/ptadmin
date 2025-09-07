import { Injectable } from '@angular/core';
import { ComponentResolver, DynamicType } from '@libs/lib-controller';

export const APP_DYNAMIC_TYPE = {
  GENDER_SELECT: 'GENDER_SELECT',
} as const;

export type AppSpecificType =
  (typeof APP_DYNAMIC_TYPE)[keyof typeof APP_DYNAMIC_TYPE];

export type AppDynamicType = DynamicType | AppSpecificType;

@Injectable()
export class GenderSelectResolver implements ComponentResolver<AppDynamicType> {
  type = APP_DYNAMIC_TYPE.GENDER_SELECT;
  resolve() {
    return {
      component: import(
        '@shared/ui/gender-select/gender-select.component'
      ).then((c) => c.GenderSelectComponent),
    };
  }
}
