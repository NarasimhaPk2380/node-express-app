import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import { Observable, of } from 'rxjs';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { SearchLayoutComponent } from './search-layout.component';
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

class RouterStub {
  url = '';
  navigate() {
    return;
  }
}

const BooksFacadeMock = {
  searchBooks(): Observable<Array<book>> {
    return of([{ id: '1' }]);
  },
  searchedBooks$: of([{ id: '1' }]),
  get spinner$() {
    return of(false);
  },
  get searchText$() {
    return of('abc');
  },
};

describe('SearchLayoutComponent', () => {
  let component: SearchLayoutComponent;
  let fixture: ComponentFixture<SearchLayoutComponent>;
  const storeMock = {
    dispatch() {
      return;
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLayoutComponent],
      imports: [BrowserAnimationsModule, FlexCardsLayoutModule, MaterialModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Store, useValue: storeMock },
        { provide: BooksFacade, useValue: BooksFacadeMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(BooksFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display booksList count as one', () => {
    component.bookSearchText$.next('');
    expect(component.booksList?.length).toBe(1);
  });

  it('check if searchtext observable has certain value', () => {
    const inputElement = fixture.debugElement.query(By.css('#searchInput'));
    expect(inputElement.nativeElement.value).toBe('abc');
  });
});
