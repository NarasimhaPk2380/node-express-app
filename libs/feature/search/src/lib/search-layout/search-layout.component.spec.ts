import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import {
  ApiService,
  CartService,
} from '@buyonline/shared/data-access/services';
import { Observable, of } from 'rxjs';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchLayoutComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: CartService,
          useValue: CartServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
