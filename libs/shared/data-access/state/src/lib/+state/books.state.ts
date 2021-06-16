import { book, billingAddress } from '@buyonline/shared/data-access/models';

export interface bookState {
  searchText: string;
  searchedBooksList: Array<book>;
  cartItems: Array<book>;
  myCollection: Array<book>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  bookDetails: book | {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  billingAddress: billingAddress | {};
  showLoading: boolean;
  error: string;
}

export const initialState: bookState = {
  searchText: '',
  searchedBooksList: [],
  cartItems: [],
  myCollection: [],
  billingAddress: {},
  bookDetails: {},
  showLoading: false,
  error: '',
};
