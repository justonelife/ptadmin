import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Appearance } from './types';
import {
  AppSeverity,
  SeverityDirective,
  LibIconPositionDirective,
} from '@libs/lib-core';

@Component({
  selector: 'lib-card',
  imports: [
    MatCardModule,
    SeverityDirective,
    LibIconPositionDirective,
    NgTemplateOutlet,
  ],
  template: `
    <mat-card libSeverity [severity]="severity()" [appearance]="appearance()">
      @if (headerTemplate(); as _headerTemplate) {
        <mat-card-header class="mb-8">
          <mat-card-title>
            <ng-container *ngTemplateOutlet="_headerTemplate"></ng-container>
          </mat-card-title>
        </mat-card-header>
      } @else if (header()) {
        <mat-card-header class="mb-8">
          <mat-card-title>
            <span
              libIconPosition="center left"
              [icon]="headerIcon()"
              iconSet="outlined"
              class="font-semibold text-sm fg-primary"
            >
              {{ header() }}
            </span>
          </mat-card-title>
        </mat-card-header>
      }
      <mat-card-content><ng-content></ng-content></mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  appearance = input<Appearance>('outlined');
  severity = input<AppSeverity>('info');

  header = input<string>();
  headerIcon = input<string>('');
  headerTemplate = contentChild<TemplateRef<unknown>>('header');
}
