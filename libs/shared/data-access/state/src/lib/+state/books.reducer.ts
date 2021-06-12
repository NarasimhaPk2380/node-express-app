import { book } from '@buyonline/shared/data-access/models';
import { Action, createReducer, on } from '@ngrx/store';
import {
  addToCart,
  deleteFromCart,
  loadBooksListSuccess,
  retrieveBookDetailsSuccess,
  setLoadingSpinner,
  submitOrder,
} from './books.actions';
import { bookState, initialState } from './books.state';

const _booksReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(loadBooksListSuccess, (state, action) => {
    return {
      ...state,
      searchedBooksList: action.booksList,
      searchText: action.searchText,
    };
  }),
  on(retrieveBookDetailsSuccess, (state, action) => {
    return {
      ...state,
      bookDetails: { ...action.book },
    };
  }),
  on(addToCart, (state, action) => {
    const cartItems = Object.assign([], state.cartItems);
    const checkIfItemAvail = cartItems.some(
      (item: book) => item.id === action.book.id
    );
    if (!checkIfItemAvail) {
      cartItems.push({ ...action.book });
    }
    return {
      ...state,
      cartItems: [...cartItems],
    };
  }),
  on(deleteFromCart, (state, action) => {
    const cartItems = state.cartItems.filter(
      (item) => item.id !== action.bookId
    );
    return {
      ...state,
      cartItems: [...cartItems],
    };
  }),
  on(submitOrder, (state, action) => {
    return {
      ...state,
      cartItems: [],
      myCollection: [...state.cartItems],
      billingAddress: { ...action.billingAddress },
    };
  })
);

export function booksReducer(state: bookState | undefined, action: Action) {
  return _booksReducer(state, action);
}
