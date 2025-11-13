import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibPopoverComponent } from './popover.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <button type="button" (click)="op.show($event)">toggle</button>
    <lib-popover #op (outsideClick)="outsideClick()">
      <div class="host-test-panel"></div>
    </lib-popover>
  `,
  imports: [LibPopoverComponent],
})
class TestHostComponent {
  outsideClick() {
    return;
  }
}

describe('it should test LibPopoverComponent', () => {
  let fixture: ComponentFixture<LibPopoverComponent>;
  let component: LibPopoverComponent;

  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let outsideClickSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(LibPopoverComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    await hostFixture.whenStable();
    hostComponent = hostFixture.componentInstance;
    outsideClickSpy = spyOn(hostComponent, 'outsideClick');
  });

  it('it should create', () => {
    expect(component).toBeDefined();
  });

  it('it should emit `outsideClick` when document.body is clicked while popover is showing', () => {
    // Prepare Open Panel
    const toggleButton = hostFixture.debugElement.query(By.css('button'));
    toggleButton.nativeElement.click();
    hostFixture.detectChanges();

    // Assert Panel is openning
    const panelDiv = hostFixture.debugElement.query(By.css('.host-test-panel'));
    expect(panelDiv).toBeTruthy();

    document.body.click();
    expect(outsideClickSpy).toHaveBeenCalledTimes(1);
  });

  it('it should NOT emit `outsideClick` when document.body is clicked while popover is NOT showing', () => {
    // Assert Panel is not openning
    const panelDiv = hostFixture.debugElement.query(By.css('.host-test-panel'));
    expect(panelDiv).toBeFalsy();

    document.body.click();
    expect(outsideClickSpy).not.toHaveBeenCalled();
  });
});
