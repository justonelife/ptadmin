import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FiltersSearchComponent } from './filters-search.component';

describe('it should test FiltersSearchComponent', () => {
  let fixture: ComponentFixture<FiltersSearchComponent>;
  let component: FiltersSearchComponent;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).createComponent(FiltersSearchComponent);

    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it('it should create', () => {
    expect(component).toBeDefined();
  });

  it('it should have search box hidden by default', () => {
    // Assert signal state
    expect(component.isShowSearchBox()).toBeFalse();
    // Assert DOM state
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeTrue();
  });

  it('it should show search box and focus input when search icon is clicked', () => {
    const inputElement = component.searchBox()?.nativeElement;
    const focusSpy = spyOn(inputElement, 'focus');

    const searchButton = fixture.debugElement.query(
      By.css('button[icon="search"]')
    );

    searchButton.nativeElement.click();
    fixture.detectChanges();

    expect(focusSpy).toHaveBeenCalled();
    expect(component.isShowSearchBox()).toBeTrue();

    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));

    expect(searchBoxDiv.classes['search-box--hide']).toBeFalsy();
  });

  it('it should NOT hide search box when search button is clicked again', () => {
    component.isShowSearchBox.set(true);
    fixture.detectChanges();
    expect(component.isShowSearchBox()).toBeTrue();

    const searchButton = fixture.debugElement.query(
      By.css('button[icon="search"]')
    );
    searchButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.isShowSearchBox()).toBeTrue();
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeFalsy();
  });

  it('it should NOT show clear button when search input is empty', () => {
    component.isShowSearchBox.set(true);
    component.form.controls.search.setValue('');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[icon="close"]')
    );
    expect(clearButton).toBeNull();
  });

  it('it should show clear button when search input have value', () => {
    component.isShowSearchBox.set(true);
    component.form.controls.search.setValue('foo');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[icon="close"]')
    );

    expect(clearButton).not.toBeNull();
  });

  it('it should clear input and hide search box when clear button is clicked', () => {
    component.isShowSearchBox.set(true);
    component.form.controls.search.setValue('foo');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(
      By.css('button[icon="close"]')
    );
    clearButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.form.controls.search.value).toBe('');
    expect(component.isShowSearchBox()).toBeFalse();
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeTrue();
  });

  it('it should hide the search box when clicking outside the component if it is open and empty', () => {
    component.isShowSearchBox.set(true);
    component.form.controls.search.setValue('');
    fixture.detectChanges();

    document.body.click();
    fixture.detectChanges();

    expect(component.isShowSearchBox()).toBeFalse();
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeTrue();
  });

  it('it should NOT hide the search box when clicking outside the component if it is open and has value', () => {
    component.isShowSearchBox.set(true);
    component.form.controls.search.setValue('foo');
    fixture.detectChanges();

    document.body.click();
    fixture.detectChanges();

    expect(component.isShowSearchBox()).toBeTrue();
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeFalsy();
  });

  it('it should show the search box and the filters when filter icon is clicked', () => {
    component.isShowSearchBox.set(false);
    component.isShowFilters.set(false);
    fixture.detectChanges();

    const filterButton = fixture.debugElement.query(
      By.css('button[icon="filter_list"]')
    );
    filterButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.isShowFilters()).toBe(true);
    expect(component.isShowSearchBox()).toBe(true);
    const searchBoxDiv = fixture.debugElement.query(By.css('.search-box'));
    expect(searchBoxDiv.classes['search-box--hide']).toBeFalsy();
  });
});
