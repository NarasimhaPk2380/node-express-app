import { TestBed } from '@angular/core/testing';
import { billingAddress, book } from '@buyonline/shared/data-access/models';
import {
  addToCart,
  deleteFromCart,
  loadBooksList,
  loadBooksListFailure,
  loadBooksListSuccess,
  retrieveBookDetails,
  retrieveBookDetailsFailure,
  retrieveBookDetailsSuccess,
  setLoadingSpinner,
  submitOrder,
} from './books.actions';
describe('LoadBooksActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
  });
  it('should create an loadBooksList', () => {
    const action = loadBooksList({ searchText: 'ang' });
    expect(action).toEqual({
      type: '[SEARCH PAGE] LOAD BOOKS LIST',
      searchText: 'ang',
    });
  });
  it('should create an loadBooksListSuccess', () => {
    const payload: book[] = [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ];
    const action = loadBooksListSuccess({
      searchText: 'an',
      booksList: [...payload],
    });
    expect({ ...action }).toStrictEqual({
      type: '[SEARCH PAGE] LOAD BOOKS LIST SUCCESS',
      booksList: [...payload],
      searchText: 'an',
    });
  });
  it('should create an loadBooksListFailure', () => {
    const action = loadBooksListFailure({
      errorMsg: 'Failed',
      booksList: [],
      searchText: 'ang',
    });
    expect({ ...action }).toStrictEqual({
      type: '[SEARCH PAGE] LOAD BOOKS LIST FAILURE',
      errorMsg: 'Failed',
      booksList: [],
      searchText: 'ang',
    });
  });
});

describe('LoadBookDetailsActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
  });
  it('should create an loadBookDetails', () => {
    const action = retrieveBookDetails({ bookId: '1' });
    expect(action).toEqual({
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS',
      bookId: '1',
    });
  });
  it('should create an loadBooksListSuccess', () => {
    const book: book = { id: '1' };
    const action = retrieveBookDetailsSuccess({
      book,
    });
    expect({ ...action }).toStrictEqual({
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS SUCCESS',
      book,
    });
  });
  it('should create an loadBooksListFailure', () => {
    const action = retrieveBookDetailsFailure({
      errorMsg: 'Failed',
    });
    expect({ ...action }).toStrictEqual({
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS FAILURE',
      errorMsg: 'Failed',
    });
  });

  it('should create an addToCart', () => {
    const book: book = { id: '1' };
    const action = addToCart({
      book,
    });
    expect({ ...action }).toStrictEqual({
      type: '[CART LIST PAGE] ADD TO CART',
      book,
    });
  });
  it('should create an deletefromcart', () => {
    const action = deleteFromCart({
      bookId: '1',
    });
    expect({ ...action }).toStrictEqual({
      type: '[CART LIST PAGE] DELETE FROM CART',
      bookId: '1',
    });
  });
  it('should create an submitorder', () => {
    const billingAddress: billingAddress = {
      name: 'narasimha',
      email: 'gygjh@gmail.com',
      phoneNumber: '123',
      address: 'jkj',
    };
    const action = submitOrder({
      billingAddress,
    });
    expect({ ...action }).toStrictEqual({
      type: '[CHECKOUT PAGE] SUBMIT ORDER',
      billingAddress,
    });
  });
  it('should create a spinner', () => {
    const action = setLoadingSpinner({
      status: true,
    });
    expect({ ...action }).toStrictEqual({
      type: 'SET LOADING SPINNER',
      status: true,
    });
  });
});
