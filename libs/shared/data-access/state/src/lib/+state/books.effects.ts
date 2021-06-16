import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadBooksList,
  loadBooksListFailure,
  loadBooksListSuccess,
  retrieveBookDetails,
  retrieveBookDetailsFailure,
  retrieveBookDetailsSuccess,
  setLoadingSpinner,
} from './books.actions';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from '@buyonline/shared/data-access/services';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { book } from '@buyonline/shared/data-access/models';
import { BooksFacade } from './books.facade';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private booksFacade: BooksFacade
  ) {}

  loadSearchBookResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBooksList),
      tap(() => this.booksFacade.triggerLoadSpinner(true)),
      exhaustMap((action) => {
        return action.searchText
          ? this.apiService
              .apiRequest('GET', {}, { q: action.searchText })
              .pipe(
                tap(() => this.booksFacade.triggerLoadSpinner(false)),
                map((booksJson) => {
                  return loadBooksListSuccess({
                    searchText: action.searchText,
                    booksList: booksJson?.items || [],
                  });
                }),
                catchError((error: HttpErrorResponse) => {
                  return of(
                    loadBooksListFailure({
                      errorMsg: error.message,
                      searchText: action.searchText,
                      booksList: [],
                    })
                  );
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
            }),
            catchError((error: HttpErrorResponse) => {
              return of(
                retrieveBookDetailsFailure({
                  errorMsg: error.message,
                })
              );
            })
          );
      })
    );
  });
}
