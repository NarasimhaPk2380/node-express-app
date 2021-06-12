import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { loadBooksList } from '@buyonline/shared/data-access/state';

const ApiServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiRequest(method: string, body?: any) {
    if (!body?.id) {
      return from([
        { id: '12', items: [{ volumeInfo: { title: 'Angular' } }] },
      ]);
    } else {
      return of({ id: '12' });
    }
  },
};

describe('CartService', () => {
  let service: CartService;
  const storeMock = {
    dispatch: jasmine.createSpy('dispatch'),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock,
        },
        { provide: Store, useValue: storeMock },
      ],
    });
    service = TestBed.inject(CartService);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should get the book object if user searchs with bookId', () => {
    const book$ = service.retrieveBookId('12');
    book$.subscribe((data) => {
      expect(data?.id).toBe('12');
    });
  });

  it('Should dispatch loadBooks action with the text', (done) => {
    service.searchBooks(of('ang')).subscribe(() => {
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        loadBooksList({ searchText: 'ang' })
      );
      done();
    });
  });
});
