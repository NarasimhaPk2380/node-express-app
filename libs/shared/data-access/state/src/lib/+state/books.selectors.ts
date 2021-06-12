import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookState } from './books.state';

const retrieveBookState = createFeatureSelector<bookState>('book');

export const getLoadingSpinner = createSelector(retrieveBookState, (state) => {
  return state.showLoading;
});

export const getSearchText = createSelector(retrieveBookState, (state) => {
  return state.searchText;
});

export const getSearchedBooks = createSelector(
  retrieveBookState,
  (state: bookState) => {
    return state.searchedBooksList;
  }
);

export const getCartItems = createSelector(
  retrieveBookState,
  (state: bookState) => {
    return state.cartItems;
  }
);
export const getMyCollection = createSelector(
  retrieveBookState,
  (state: bookState) => {
    return state.myCollection;
  }
);
