import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { book } from '@buyonline/shared/data-access/models';
import {
  addToCart,
  BooksFacade,
  bookState,
} from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-cart-details-layout',
  templateUrl: './cart-details-layout.component.html',
  styleUrls: ['./cart-details-layout.component.scss'],
})
export class CartDetailsLayoutComponent implements OnInit {
  bookDetailsJson!: book;
  availableRating = 3;
  ratingArr: Array<number> = [1, 2, 3, 4, 5];
  constructor(private booksFacade: BooksFacade) {}

  ngOnInit(): void {
    this.booksFacade.bookDetails$.subscribe((booksData) => {
      this.bookDetailsJson = { ...booksData } as book;
      this.availableRating = this.bookDetailsJson.volumeInfo?.rating || 0;
    });
  }

  addToCart(): void {
    this.booksFacade.addToCart({ ...this.bookDetailsJson });
  }
}
