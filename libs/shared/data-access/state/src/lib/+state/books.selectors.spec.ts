import {
  getCartItems,
  getLoadingSpinner,
  getMyCollection,
  getSearchedBooks,
  getSearchText,
} from './books.selectors';
import { book } from '@buyonline/shared/data-access/models';
import { bookState, initialState } from './books.state';

describe('BooksSelector', () => {
  const initialBookState: bookState = { ...initialState };
  const booksList: Array<book> = [
    { id: '1', volumeInfo: { title: 'angular' } },
    { id: '2', volumeInfo: { title: 'ngrx' } },
  ];

  it('should return loadSpinner status from state', () => {
    const state: bookState = {
      ...initialBookState,
      showLoading: true,
    };
    expect(getLoadingSpinner.projector(state)).toBeTruthy();
  });
  it('should return searchedText from state', () => {
    const state: bookState = {
      ...initialBookState,
      searchText: 'ang',
    };
    expect(getSearchText.projector(state)).toBe('ang');
  });
  it('should return searchedBooksList', () => {
    const state: bookState = {
      ...initialBookState,
      searchedBooksList: [...booksList],
    };
    expect(getSearchedBooks.projector(state)).toEqual(booksList);
  });
  it('should return cartItemsList', () => {
    const state: bookState = {
      ...initialBookState,
      cartItems: [...booksList],
    };
    expect(getCartItems.projector(state)[0].id).toBe('1');
  });
  it('should return myCollectionList', () => {
    const state: bookState = {
      ...initialBookState,
      myCollection: [...booksList],
    };
    expect(getMyCollection.projector(state)[1].volumeInfo?.title).toEqual(
      'ngrx'
    );
  });
});
