import { billingAddress, book } from '@buyonline/shared/data-access/models';
import { createAction, props } from '@ngrx/store';

export const loadBooksList = createAction(
  '[SEARCH PAGE] LOAD BOOKS LIST',
  props<{ searchText: string }>()
);
export const loadBooksListSuccess = createAction(
  '[SEARCH PAGE] LOAD BOOKS LIST SUCCESS',
  props<{ searchText: string; booksList: book[] }>()
);
export const loadBooksListFailure = createAction(
  '[SEARCH PAGE] LOAD BOOKS LIST FAILURE',
  props<{ errorMsg: string; searchText: string; booksList: book[] }>()
);

export const retrieveBookDetails = createAction(
  '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS',
  props<{ bookId: string }>()
);
export const retrieveBookDetailsSuccess = createAction(
  '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS SUCCESS',
  props<{ book: book }>()
);
export const retrieveBookDetailsFailure = createAction(
  '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS FAILURE',
  props<{ errorMsg: string }>()
);

export const addToCart = createAction(
  '[CART LIST PAGE] ADD TO CART',
  props<{ book: book }>()
);
export const deleteFromCart = createAction(
  '[CART LIST PAGE] DELETE FROM CART',
  props<{ bookId: string }>()
);

export const submitOrder = createAction(
  '[CHECKOUT PAGE] SUBMIT ORDER',
  props<{ billingAddress: billingAddress }>()
);

export const setLoadingSpinner = createAction(
  'SET LOADING SPINNER',
  props<{ status: boolean }>()
);
