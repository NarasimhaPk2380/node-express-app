import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { BooksFacade } from './books.facade';
import { initialState, bookState } from './books.state';
import { of } from 'rxjs';
import {
  addToCart,
  deleteFromCart,
  loadBooksList,
  retrieveBookDetails,
  setLoadingSpinner,
  submitOrder,
} from './books.actions';

const storeMock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(key: MemoizedSelector<bookState, any, any>) {
    initialState.myCollection = [{ id: '1' }];
    initialState.searchedBooksList = [{ id: '1' }, { id: '2' }];
    return of(key.projector(initialState));
  },
  dispatch: jasmine.createSpy('dispatch'),
};

describe('BooksFacade', () => {
  let facade: BooksFacade;
  const fakeAddressJson = {
    name: 'asdad',
    email: 'asdad@gmail.com',
    phoneNumber: '1234567891',
    address: 'asdad',
  };
  describe('used in NgModule', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BooksFacade, { provide: Store, useValue: storeMock }],
      });
      TestBed.inject(Store);
      facade = TestBed.inject(BooksFacade);
    });

    it('Should get the search text from facade', async (done) => {
      try {
        const searchText = await readFirst(facade.searchText$);
        expect(searchText).toBe('');
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should get the loadingspinner status from facade', async (done) => {
      try {
        const loadingSpinner = await readFirst(facade.loadingSpinner$);
        expect(loadingSpinner).toBe(false);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should get the cart items from facade', async (done) => {
      try {
        const cartItems = await readFirst(facade.cartItems$);
        expect(cartItems).toEqual([]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('Should get the searched books from facade', async (done) => {
      try {
        const searchedBooks = await readFirst(facade.searchedBooks$);
        expect(searchedBooks).toEqual([{ id: '1' }, { id: '2' }]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should get the my collection from facade', async (done) => {
      try {
        const myCollection = await readFirst(facade.myCollection$);
        expect(myCollection).toEqual([{ id: '1' }]);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('Should invoke setLoadingSpinner', async (done) => {
      try {
        facade.triggerLoadSpinner(true);
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          setLoadingSpinner({ status: true })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should invoke loadBooksList', async (done) => {
      try {
        facade.loadBooksList('ang');
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          loadBooksList({ searchText: 'ang' })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should invoke retrieveBookDetails', async (done) => {
      try {
        facade.retrieveBookDetails('2');
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          retrieveBookDetails({ bookId: '2' })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should invoke addToCart', async (done) => {
      try {
        facade.addToCart({ id: '1' });
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          addToCart({ book: { id: '1' } })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should invoke deleteFromCart', async (done) => {
      try {
        facade.deleteFromCart('1');
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          deleteFromCart({ bookId: '1' })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });
    it('Should invoke submitCheckout', async (done) => {
      try {
        facade.submitCheckout(fakeAddressJson);
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          submitOrder({ billingAddress: fakeAddressJson })
        );
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('Should dispatch loadBooks action with the text', (done) => {
      facade.searchBooks(of('ang')).subscribe(() => {
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          loadBooksList({ searchText: 'ang' })
        );
        done();
      });
    });
    it('Should return boolean', (done) => {
      facade.waitForLoadingBookDetails().subscribe((data) => {
        expect(data).toBeFalsy();
        done();
      });
    });
  });
});
