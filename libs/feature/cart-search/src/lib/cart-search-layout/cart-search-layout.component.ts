import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  UtilsService,
  AppService,
} from '@buyonline/shared/data-access/services';
import { appSubjectI, bookI } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-cart-search-layout',
  templateUrl: './cart-search-layout.component.html',
  styleUrls: ['./cart-search-layout.component.scss'],
})
export class CartSearchLayoutComponent implements OnInit {
  booksList: Array<bookI> = [];
  bookSearchText$ = new Subject<string>();
  booksSubscription: Subscription = new Subscription();
  spinner!: Observable<boolean>;
  constructor(
    private appSrvc: AppService,
    private utilsSrvc: UtilsService,
    private router: Router
  ) {
    this.booksSubscription = this.appSrvc
      .searchBooks(this.bookSearchText$)
      .subscribe((booksResponse: Array<bookI>) => {
        this.booksList = booksResponse;
      });
    this.utilsSrvc.bookAppSubject$.subscribe((event: appSubjectI) => {
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
