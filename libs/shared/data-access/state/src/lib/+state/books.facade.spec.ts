import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { BooksFacade } from './books.facade';
import { initialState, bookState } from './books.state';
import { of } from 'rxjs';

const storeMock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(key: MemoizedSelector<bookState, any, any>) {
    initialState.myCollection = [{ id: '1' }];
    initialState.searchedBooksList = [{ id: '1' }, { id: '2' }];
    return of(key.projector(initialState));
  },
};

describe('BooksFacade', () => {
  let facade: BooksFacade;

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
  });
});
