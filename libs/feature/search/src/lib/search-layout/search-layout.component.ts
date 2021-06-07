import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  UtilsService,
  CartService,
} from '@buyonline/shared/data-access/services';
import { appSubject, book } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit {
  booksList: Array<book> = [];
  bookSearchText$ = new Subject<string>();
  booksSubscription: Subscription = new Subscription();
  spinner!: Observable<boolean>;
  constructor(
    private cartSrvc: CartService,
    private utilsSrvc: UtilsService,
    private router: Router
  ) {
    this.booksSubscription = this.cartSrvc
      .searchBooks(this.bookSearchText$)
      .subscribe((booksResponse: Array<book>) => {
        this.booksList = booksResponse;
      });
    this.utilsSrvc.bookAppSubject$.subscribe((event: appSubject) => {
      if (event?.type === 'spinner') {
        this.spinner = event.value;
      }
    });
  }
  ngOnInit(): void {}

  goToDetailsPage(bookId: string) {
    this.router.navigate([`/cart-details/${bookId}`]);
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
