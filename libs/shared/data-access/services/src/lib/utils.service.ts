import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  appSubjectI,
  bookI,
  booksAppI,
} from '@buyonline/shared/data-access/models';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  appSubject$ = new Subject<appSubjectI>();
  booksAppJson: booksAppI = {
    cartItems: [],
    myCollection: [],
    billingAddress: {},
  };
  constructor() {}

  set modifybooksAppJson(data: booksAppI) {
    this.booksAppJson = { ...data };
  }
  get modifybooksAppJson(): booksAppI {
    return this.booksAppJson;
  }

  get bookAppSubject$() {
    return this.appSubject$.asObservable();
  }

  addItemToCart(data: bookI) {
    const isItemAvailableInList = this.booksAppJson?.cartItems?.some(
      (book) => book?.id === data?.id
    );
    !isItemAvailableInList ? this.booksAppJson?.cartItems?.push(data) : '';
    this.appSubject$.next({ type: 'addToCart', value: '' });
  }
  deleteItemFromCart(bookId: string) {
    const itemIndex = this.booksAppJson?.cartItems?.findIndex(
      (book) => book?.id === bookId
    );
    this.booksAppJson?.cartItems?.splice(itemIndex, 1);
    this.appSubject$.next({ type: 'addToCart', value: '' });
  }
}
