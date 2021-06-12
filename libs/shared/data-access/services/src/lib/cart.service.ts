import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { book } from '@buyonline/shared/data-access/models';

import { ApiService } from './api.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { bookState, loadBooksList } from '@buyonline/shared/data-access/state';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private apiService: ApiService,
    private store: Store<bookState>
  ) {}

  // API calls invoking
  searchBooks(searchText$: Observable<string>): Observable<Array<book>> {
    return searchText$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchText) => {
        this.store.dispatch(loadBooksList({ searchText }));
        return of([]);
      })
    );
  }

  retrieveBookId(bookId: string): Observable<book> {
    return this.apiService
      .apiRequest('GET', { id: bookId }, {})
      .pipe(map((booksJson) => booksJson as book));
  }
}
