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
  LibSeverity,
  LibSeverityDirective,
  LibIconPositionDirective,
} from '@libs/lib-core';

@Component({
  selector: 'lib-card',
  imports: [
    MatCardModule,
    LibSeverityDirective,
    LibIconPositionDirective,
    NgTemplateOutlet,
  ],
  template: `
    <mat-card [libSeverity]="severity()" [appearance]="appearance()">
      <mat-card-header>
        @if (titleTemplate(); as _titleTemplate) {
          <mat-card-title>
            <ng-container *ngTemplateOutlet="_titleTemplate"></ng-container>
          </mat-card-title>
        } @else if (title()) {
          <!-- NOTE: flex! for icon position working properly-->
          <mat-card-title
            libIconPosition="center left"
            [icon]="titleIcon()"
            iconSet="outlined"
            class="flex!"
          >
            {{ title() }}
          </mat-card-title>
        }

        @if (subTitleTemplate(); as _subTitleTemplate) {
          <mat-card-subtitle>
            <ng-container *ngTemplateOutlet="_subTitleTemplate"></ng-container>
          </mat-card-subtitle>
        } @else if (subTitle()) {
          <mat-card-subtitle>
            {{ subTitle() }}
          </mat-card-subtitle>
        }
      </mat-card-header>
      <mat-card-content><ng-content></ng-content></mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-card-header-text {
          width: 100%;
        }
      }
    `,
  ],
})
export class LibCardComponent {
  appearance = input<Appearance>('outlined');
  //TODO: use severity directive?
  severity = input<LibSeverity>('neutral');

  titleTemplate = contentChild<TemplateRef<unknown>>('title');
  title = input<string>();
  titleIcon = input<string>('');

  subTitle = input<string>();
  subTitleTemplate = contentChild<TemplateRef<unknown>>('subTitle');
}
