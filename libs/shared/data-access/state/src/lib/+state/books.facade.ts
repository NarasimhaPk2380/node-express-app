import { Injectable } from '@angular/core';
import { billingAddress, book } from '@buyonline/shared/data-access/models';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import {
  addToCart,
  deleteFromCart,
  loadBooksList,
  retrieveBookDetails,
  setLoadingSpinner,
  submitOrder,
} from './books.actions';
import {
  getSearchedBooks,
  getCartItems,
  getMyCollection,
  getLoadingSpinner,
  getSearchText,
  getBookDetails,
  getError,
} from './books.selectors';
import { bookState } from './books.state';

@Injectable({
  providedIn: 'root',
})
export class BooksFacade {
  searchText$ = this.store.select(getSearchText);
  loadingSpinner$ = this.store.select(getLoadingSpinner);
  searchedBooks$ = this.store.select(getSearchedBooks);
  cartItems$ = this.store.select(getCartItems);
  myCollection$ = this.store.select(getMyCollection);
  bookDetails$ = this.store.select(getBookDetails);
  error$ = this.store.select(getError);

  constructor(private store: Store<bookState>) {}

  triggerLoadSpinner(status: boolean) {
    this.store.dispatch(setLoadingSpinner({ status }));
  }
  loadBooksList(searchText: string) {
    this.store.dispatch(loadBooksList({ searchText }));
  }
  retrieveBookDetails(bookId: string) {
    this.store.dispatch(retrieveBookDetails({ bookId }));
  }
  addToCart(book: book): void {
    this.store.dispatch(addToCart({ book }));
  }
  deleteFromCart(bookId: string) {
    this.store.dispatch(deleteFromCart({ bookId }));
  }
  submitCheckout(billingAddress: billingAddress): void {
    this.store.dispatch(submitOrder({ billingAddress }));
  }

  searchBooks(searchText$: Observable<string>): Observable<Array<book>> {
    return searchText$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchText: string) => {
        this.store.dispatch(loadBooksList({ searchText }));
        return of([]);
      })
    );
  }
  waitForLoadingBookDetails(): Observable<boolean> {
    return this.loadingSpinner$.pipe(
      filter((loaded) => !loaded),
      take(1)
    );
  }
}
