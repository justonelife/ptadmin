import { JsonPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { LibButtonComponent } from '@libs/lib-button';
import {
  LibControllerWrapperComponent,
  LibSelectComponent,
} from '@libs/lib-controller';
import { LibPopoverComponent } from '@libs/lib-overlay';
import { OutsideClickDirective } from '@shared/data-access';

@Component({
  selector: 'app-filters-search',
  templateUrl: './filters-search.component.html',
  styleUrl: './filters-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonPipe,
    LibPopoverComponent,
    NgClass,
    LibSelectComponent,
    LibControllerWrapperComponent,
    OutsideClickDirective,
  ],
})
export class FiltersSearchComponent {
  elementRef = inject(ElementRef);

  isShowFilters = signal(false);
  isShowSearchBox = linkedSignal<boolean, boolean>({
    source: this.isShowFilters,
    computation: (source, previous) => {
      if (this.form.controls.search.value) return !!previous?.value;
      return source;
    },
  });

  form = new FormGroup({
    search: new FormControl(''),
  });

  searchBox = viewChild(MatInput, {
    read: ElementRef<HTMLElement>,
  });

  showSearchBoxAndFocusInput() {
    this.isShowSearchBox.set(true);
    this.searchBox()?.nativeElement.focus();
  }

  clearSearchAndHideSearchBox() {
    this.form.controls.search.setValue('');
    this.isShowSearchBox.set(false);
  }
}
