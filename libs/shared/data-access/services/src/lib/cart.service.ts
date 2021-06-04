import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { bookI } from '@buyonline/shared/data-access/models';

import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apiService: ApiService, private utilSrvc: UtilsService) {}

  // API calls invoking
  searchBooks(searchText$: Observable<string>): Observable<Array<bookI>> {
    return searchText$.pipe(
      tap((_) =>
        this.utilSrvc.appSubject$.next({
          type: 'spinner',
          value: true,
        })
      ),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchText) =>
        searchText
          ? this.apiService.apiRequest('GET', {}, { q: searchText }).pipe(
              tap((_) =>
                this.utilSrvc.appSubject$.next({
                  type: 'spinner',
                  value: false,
                })
              ),
              map((booksJson) => booksJson.items as Array<bookI>)
            )
          : of([])
      )
    );
  }

  retrieveBookId(bookId: string): Observable<bookI> {
    return this.apiService
      .apiRequest('GET', { id: bookId }, {})
      .pipe(map((booksJson) => booksJson as bookI));
  }
}
