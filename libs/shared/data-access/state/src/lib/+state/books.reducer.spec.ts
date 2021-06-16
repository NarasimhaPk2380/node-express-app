import { booksReducer } from './books.reducer';
import { initialState } from './books.state';

describe('BooksReducer', () => {
  it('should show loader when the status is true in action payload', () => {
    const expected = { showLoading: true };
    const action = { type: 'SET LOADING SPINNER', status: true };
    const { showLoading } = booksReducer(initialState, action);
    expect(showLoading).toEqual(expected.showLoading);
  });
  it('should show books list if loadbooks action gets success', () => {
    const expected = [{ id: '1', volumeInfo: { title: 'Angular' } }];
    const action = {
      type: '[SEARCH PAGE] LOAD BOOKS LIST SUCCESS',
      searchText: 'ang',
      booksList: [...expected],
    };
    const { searchedBooksList } = booksReducer(initialState, action);
    expect(searchedBooksList).toEqual(expected);
  });
  it('should show books list if loadbooks action gets failure', () => {
    const action = {
      type: '[SEARCH PAGE] LOAD BOOKS LIST FAILURE',
      searchText: 'ang',
      booksList: [],
    };
    const { searchedBooksList } = booksReducer(initialState, action);
    expect(searchedBooksList).toEqual([]);
  });

  it('should show books details if loadbooksdetails action gets success', () => {
    const expected = { id: '1', volumeInfo: { title: 'Angular' } };
    const action = {
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS SUCCESS',
      book: { ...expected },
    };
    const { bookDetails } = booksReducer(initialState, action);
    expect(bookDetails).toEqual(expected);
  });

  it('should show books details if loadbooksdetails action gets failure', () => {
    const action = {
      type: '[BOOK DETAILS PAGE] RETRIVE BOOK DETAILS FAILURE',
      book: {},
    };
    const { bookDetails } = booksReducer(initialState, action);
    expect(bookDetails).toEqual({});
  });
  it('should show added item in the cartItems', () => {
    const expected = { id: '1', volumeInfo: { title: 'Angular' } };
    const action = {
      type: '[CART LIST PAGE] ADD TO CART',
      book: { ...expected },
    };
    const { cartItems } = booksReducer(initialState, action);
    expect(cartItems).toEqual([expected]);
  });
  it('should not add item in the cartItems when it is same id', () => {
    const expected = { id: '1', volumeInfo: { title: 'Angular' } };
    const action = {
      type: '[CART LIST PAGE] ADD TO CART',
      book: { ...expected },
    };
    const { cartItems } = booksReducer(
      { ...initialState, cartItems: [expected] },
      action
    );
    expect(cartItems.length).toEqual(1);
  });

  it('should delete item from the cart if the bookid matches', () => {
    const expected = { id: '1', volumeInfo: { title: 'Angular' } };
    const action = {
      type: '[CART LIST PAGE] DELETE FROM CART',
      bookId: '1',
    };
    const { cartItems } = booksReducer(
      { ...initialState, cartItems: [expected] },
      action
    );
    expect(cartItems.length).toEqual(0);
  });

  it('should push cartItems to mycollection after clicking submit order', () => {
    const expected = { id: '1', volumeInfo: { title: 'Angular' } };
    const action = {
      type: '[CHECKOUT PAGE] SUBMIT ORDER',
    };
    const { myCollection } = booksReducer(
      { ...initialState, cartItems: [expected] },
      action
    );
    expect(myCollection).toEqual([expected]);
  });
});
