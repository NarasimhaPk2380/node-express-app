import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadBooksList,
  loadBooksListSuccess,
  retrieveBookDetails,
  retrieveBookDetailsSuccess,
  setLoadingSpinner,
} from './books.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from '@buyonline/shared/data-access/services';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { book } from '@buyonline/shared/data-access/models';
import { Store } from '@ngrx/store';
import { bookState } from './books.state';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<bookState>
  ) {}

  loadSearchBookResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksList),
      tap(() => this.store.dispatch(setLoadingSpinner({ status: true }))),
      exhaustMap((action) => {
        return action.searchText
          ? this.apiService
              .apiRequest('GET', {}, { q: action.searchText })
              .pipe(
                tap(() =>
                  this.store.dispatch(setLoadingSpinner({ status: false }))
                ),
                map((booksJson) => {
                  return loadBooksListSuccess({
                    searchText: action.searchText,
                    booksList: booksJson.items,
                  });
                })
              )
          : of(
              loadBooksListSuccess({
                searchText: '',
                booksList: [],
              })
            );
      })
    );
  });
  loadBookDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(retrieveBookDetails),
      tap(() => setLoadingSpinner({ status: true })),
      exhaustMap((action) => {
        return this.apiService
          .apiRequest('GET', { id: action.bookId }, {})
          .pipe(
            tap(() => setLoadingSpinner({ status: false })),
            map((book: book) => {
              return retrieveBookDetailsSuccess({
                book,
              });
            })
          );
      })
    );
  });
}
