import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import {
  ApiService,
  CartService,
  UtilsService,
} from '@buyonline/shared/data-access/services';
import { Observable, of } from 'rxjs';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { SearchLayoutComponent } from './search-layout.component';

class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) {}
}
class CartServiceMock {
  searchBooks(txt: Observable<string>): Observable<Array<book>> {
    return of([{ id: '1' }]);
  }
}

describe('SearchLayoutComponent', () => {
  let component: SearchLayoutComponent;
  let fixture: ComponentFixture<SearchLayoutComponent>;
  let UtilsServiceMock = {
    bookAppSubject$: of({ type: 'spinner', value: false }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLayoutComponent],
      imports: [BrowserAnimationsModule, FlexCardsLayoutModule, MaterialModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: CartService,
          useClass: CartServiceMock,
        },
        {
          provide: UtilsService,
          useValue: UtilsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner false on init', () => {
    expect(component.spinner).toBeFalsy();
  });

  it('should call goToDetailsPage(bookId: string)', () => {
    spyOn(component, 'goToDetailsPage').and.callThrough();
    component.goToDetailsPage('2222');
    // fixture.detectChanges();
    expect(component.goToDetailsPage).toHaveBeenCalled();
  });
});
