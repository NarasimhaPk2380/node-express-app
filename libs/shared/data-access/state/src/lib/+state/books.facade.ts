import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
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
}
