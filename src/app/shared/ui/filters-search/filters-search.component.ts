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
  ],
})
export class FiltersSearchComponent {
  elementRef = inject(ElementRef);

  // @HostListener('document:click', ['$event'])
  // onClick(event: Event) {
  //   if (
  //     this.isShowSearchBox() &&
  //     !this.form.controls.search.value &&
  //     !this.elementRef.nativeElement.contains(event.target)
  //   ) {
  //     this.isShowFilters.set(false);
  //     this.isShowSearchBox.set(false);
  //   }
  // }

  isShowFilters = signal(false);
  isShowSearchBox = linkedSignal(() => {
    return this.isShowFilters();
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
