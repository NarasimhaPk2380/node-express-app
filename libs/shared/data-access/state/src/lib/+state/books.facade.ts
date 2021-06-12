import { Injectable } from '@angular/core';
import { billingAddress, book } from '@buyonline/shared/data-access/models';

import { Store } from '@ngrx/store';
import {
  addToCart,
  deleteFromCart,
  loadBooksList,
  setLoadingSpinner,
  submitOrder,
} from './books.actions';
import {
  getSearchedBooks,
  getCartItems,
  getMyCollection,
  getLoadingSpinner,
  getSearchText,
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

  constructor(private store: Store<bookState>) {}

  triggerLoadSpinner(status: boolean) {
    this.store.dispatch(setLoadingSpinner({ status }));
  }
  loadBooksList(searchText: string) {
    this.store.dispatch(loadBooksList({ searchText }));
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
}
