import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { CartService } from '@buyonline/shared/data-access/services';
import { book } from '@buyonline/shared/data-access/models';
import { BooksFacade } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit, OnDestroy {
  booksList: Array<book> = [];
  availSearchVal$: Observable<string> = this.booksFacade.searchText$;
  bookSearchText$ = new Subject<string>();
  booksSubscription: Subscription = new Subscription();
  spinner$: Observable<boolean> = this.booksFacade.loadingSpinner$;
  constructor(
    private cartSrvc: CartService,
    private router: Router,
    private booksFacade: BooksFacade
  ) {
    this.booksSubscription = this.cartSrvc
      .searchBooks(this.bookSearchText$)
      .subscribe(() => {
        return;
      });
  }
  ngOnInit(): void {
    this.booksFacade.searchedBooks$.subscribe((data) => {
      this.booksList = [...data];
    });
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
