import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibPopoverComponent } from './popover.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('it should test LibPopoverComponent', () => {
  let fixture: ComponentFixture<LibPopoverComponent>;
  let component: LibPopoverComponent;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).createComponent(LibPopoverComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('it should create', () => {
    expect(component).toBeDefined();
  });

  // it('it should emit `outsideClick` when document.body is clicked', () => {
  //   const outsideSpy = spyOn(component, 'outsideClick')
  //   document.body.click();
  //
  // })
});
