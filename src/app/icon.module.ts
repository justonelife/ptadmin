import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule],
  providers: [MatIconRegistry],
})
export class IconModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconInNamespace(
      'custom',
      'google',
      domSanitizer.bypassSecurityTrustResourceUrl('/svgs/google.svg')
    );

    iconRegistry.registerFontClassAlias(
      'filled',
      'material-icons mat-ligature-font size-20'
    );
    iconRegistry.registerFontClassAlias(
      'filled-sm',
      'material-icons mat-ligature-font size-10'
    );
    iconRegistry.registerFontClassAlias(
      'outlined',
      'material-symbols-outlined mat-ligature-font material-icons size-20' //TODO: find better way than hardcode size-20
    );
    iconRegistry.registerFontClassAlias(
      'outlined-sm',
      'material-symbols-outlined mat-ligature-font material-icons size-10' //TODO: find better way than hardcode size-20
    );
    iconRegistry.registerFontClassAlias(
      'outlined-lg',
      'material-symbols-outlined mat-ligature-font material-icons size-30'
    );
    iconRegistry.registerFontClassAlias(
      'symbols-outlined',
      'material-symbols-outlined'
    );
  }
}
