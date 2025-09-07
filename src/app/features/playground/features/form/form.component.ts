import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicFormBuilderField,
  LibDynamicFormBuilderComponent,
} from '@libs/lib-controller';
import { AppDynamicType } from '@shared/data-access/types';

@Component({
  imports: [LibDynamicFormBuilderComponent],
  selector: 'app-playground-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundFormComponent {
  readonly typedMockFields: DynamicFormBuilderField<AppDynamicType>[] = [
    {
      key: 'language',
      label: 'Preferred Language',
      type: 'SELECT',
      inputs: {
        options: [
          { value: 'en', label: 'English' },
          { value: 'vi', label: 'Vietnamese' },
          { value: 'jp', label: 'Japanese' },
        ],
      },
      hidden: false,
      styleClass: 'col-span-12',
      validations: [
        {
          type: 'required',
        },
      ],
      defaultValue: 'vi',
    },
    {
      key: 'age',
      label: 'Age',
      type: 'NUMBER_INPUT',
      inputs: {
        placeholder: 'Input your age',
      },
      hidden: false,
      styleClass: 'col-span-12',
      validations: [{ type: 'required' }, { type: 'min', data: 20 }],
    },
    {
      key: 'word',
      label: 'Word',
      type: 'INPUT',
      inputs: {
        placeholder: 'Input a word',
      },
      hidden: false,
      styleClass: 'col-span-12',
      validations: [
        { type: 'banwords', data: ['student'] },
        { type: 'required' },
      ],
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'GENDER_SELECT',
      hidden: false,
      styleClass: 'col-span-12',
      validations: [
        {
          type: 'banvalue',
          data: 0,
        },
      ],
    },
  ];
}
