import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from '@buyonline/shared/data-access/services';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, of, ReplaySubject, throwError } from 'rxjs';
import { BooksEffects } from './books.effects';
import { BooksFacade } from './books.facade';

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

const ApiServiceMock1 = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiRequest() {
    return throwError(
      new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
      })
    );
  },
};

describe('BooksEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$ = new ReplaySubject<any>();
  let effects: BooksEffects;
  const booksFacadeMock = {
    triggerLoadSpinner: jasmine.createSpy('triggerLoadSpinner'),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock,
        },
        BooksEffects,
        provideMockActions(() => actions$),
        { provide: BooksFacade, useValue: booksFacadeMock },
      ],
    });
    effects = TestBed.inject(BooksEffects);
  });
  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  it('should get the books on success action', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: '[SEARCH PAGE] LOAD BOOKS LIST',
      searchText: 'as',
    });
    effects.loadSearchBookResults$.subscribe((data) => {
      expect(data?.booksList[0]?.volumeInfo?.title).toBe('Angular');
      done();
    });
  });

  it('should get the empty books list when search text is empty', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: '[SEARCH PAGE] LOAD BOOKS LIST',
      searchText: '',
    });
    effects.loadSearchBookResults$.subscribe((data) => {
      expect(data?.booksList.length).toBe(0);
      done();
    });
  });
  it('should get the bookDetails on success action', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS',
      searchText: 'as',
    });
    effects.loadBookDetails$.subscribe((data) => {
      if (data.type === '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS SUCCESS') {
        expect(data?.book?.id).toBe('12');
      }
      done();
    });
  });
});

describe('BooksEffects on failure cases', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$ = new ReplaySubject<any>();
  let effects: BooksEffects;
  const booksFacadeMock = {
    triggerLoadSpinner: jasmine.createSpy('triggerLoadSpinner'),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ApiService,
          useValue: ApiServiceMock1,
        },
        BooksEffects,
        provideMockActions(() => actions$),
        { provide: BooksFacade, useValue: booksFacadeMock },
      ],
    });
    effects = TestBed.inject(BooksEffects);
  });
  it('should give message on failed bookslist', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: '[SEARCH PAGE] LOAD BOOKS LIST',
      searchText: 'as',
    });
    effects.loadSearchBookResults$.subscribe((data) => {
      expect(data.type).toBe('[SEARCH PAGE] LOAD BOOKS LIST FAILURE');
      done();
    });
  });
  it('should give message on failed bookdetails', async (done) => {
    actions$ = new ReplaySubject(1);
    actions$.next({
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS',
      searchText: 'as',
    });
    effects.loadBookDetails$.subscribe((data) => {
      expect(data.type).toBe(
        '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS FAILURE'
      );
      done();
    });
  });
});
