import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  SearchVariablePipe,
  Store,
  VariableCardCountCompletedPipe,
  VariableCardSeverityPipe,
} from '@features/mail-template-editor/data-access';
import { LibButtonComponent } from '@libs/lib-button';
import { LibCardComponent } from '@libs/lib-card';
import {
  DYNAMIC_TYPE,
  LibControllerWrapperComponent,
  LibDynamicFormComponent,
  LibTextInputComponent,
  RecordDynamicField,
} from '@libs/lib-controller';
import {
  LibAppearanceDirective,
  LibClassMergerDirective,
  LibHighLightPipe,
  LibIconPositionDirective,
  LibSeverityDirective,
} from '@libs/lib-core';

@Component({
  selector: 'app-mail-template-variables-manager',
  templateUrl: './variables-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibButtonComponent,
    LibTextInputComponent,
    LibCardComponent,
    LibIconPositionDirective,
    LibSeverityDirective,
    LibClassMergerDirective,
    LibAppearanceDirective,
    LibDynamicFormComponent,
    ReactiveFormsModule,
    VariableCardSeverityPipe,
    VariableCardCountCompletedPipe,
    LibControllerWrapperComponent,
    FormsModule,
    KeyValuePipe,
    SearchVariablePipe,
    LibHighLightPipe,
  ],
})
export class VariablesManagerComponent {
  readonly store = inject(Store);

  showAddForm = false;
  newVariable = '';

  readonly FIELDS: RecordDynamicField = {
    en: {
      label: 'English',
      type: DYNAMIC_TYPE.TEXTAREA,
      withWrapper: false,
      styleClass: 'col-span-12',
      inputs: {
        rows: 3,
      },
    },
    pt: {
      label: 'Portuguese',
      type: DYNAMIC_TYPE.TEXTAREA,
      withWrapper: false,
      styleClass: 'col-span-12',
      inputs: {
        rows: 3,
      },
    },
    zh: {
      label: 'Chinese',
      type: DYNAMIC_TYPE.TEXTAREA,
      withWrapper: false,
      styleClass: 'col-span-12',
      inputs: {
        rows: 3,
      },
    },
  };

  tempForm = new FormGroup({
    en: new FormControl(),
    pt: new FormControl(),
    zh: new FormControl(),
  });

  search = '';

  onAddVariable(): void {
    this.store.addVariable(this.newVariable);
    this.newVariable = '';
  }
}
