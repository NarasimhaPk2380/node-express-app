import { TestBed } from '@angular/core/testing';
import { appSubject } from '@buyonline/shared/data-access/models';
import {
  ApiService,
  CartService,
} from '@buyonline/shared/data-access/services';
import { from, of, Subject } from 'rxjs';
import { UtilsService } from './utils.service';

const UtilsServiceMock = {
  appSubject$: new Subject<appSubject>(),
};
const ApiServiceMock = {
  apiRequest(method: string, body?: any, params?: any) {
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock,
        },
        {
          provide: UtilsService,
          useValue: UtilsServiceMock,
        },
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

  it('Should get the list when user searchs with the random text', (done) => {
    const book$ = service.searchBooks(of('ang'));
    book$.subscribe((data) => {
      expect(data?.length).toBe(1);
      done();
    });
  });
});
