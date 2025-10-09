import {
  booleanAttribute,
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
import { LibButtonComponent } from '@libs/lib-button';

@Component({
  selector: 'lib-card',
  imports: [
    MatCardModule,
    LibSeverityDirective,
    LibIconPositionDirective,
    NgTemplateOutlet,
    LibButtonComponent,
  ],
  template: `
    @let _withToggle = withToggle();
    <mat-card [libSeverity]="severity()" [appearance]="appearance()">
      <mat-card-header>
        @if (titleTemplate(); as _titleTemplate) {
          <mat-card-title>
            <div class="flex gap-1 items-center">
              <div class="grow">
                <ng-container *ngTemplateOutlet="_titleTemplate"></ng-container>
              </div>
              @if (_withToggle) {
                <button
                  type="button"
                  lib-button
                  [icon]="
                    isVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                  "
                  appearance="ghost"
                  severity="neutral"
                  (click)="isVisible = !isVisible"
                ></button>
              }
            </div>
          </mat-card-title>
        } @else if (title()) {
          <!-- NOTE: flex! for icon position working properly-->
          <mat-card-title
            libIconPosition="center left"
            [icon]="titleIcon()"
            class="flex!"
          >
            <div class="flex gap-1 items-center">
              <div class="grow">
                {{ title() }}
              </div>
              @if (_withToggle) {
                <button
                  type="button"
                  lib-button
                  [icon]="
                    isVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                  "
                  appearance="ghost"
                  severity="neutral"
                  (click)="isVisible = !isVisible"
                ></button>
              }
            </div>
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
      <mat-card-content>
        @if (isVisible) {
          <ng-content></ng-content>
        }
      </mat-card-content>
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

  withToggle = input(false, { transform: booleanAttribute });

  isVisible = true;
}
