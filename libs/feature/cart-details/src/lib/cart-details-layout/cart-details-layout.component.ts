import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { book } from '@buyonline/shared/data-access/models';
import { addToCart, bookState } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-cart-details-layout',
  templateUrl: './cart-details-layout.component.html',
  styleUrls: ['./cart-details-layout.component.scss'],
})
export class CartDetailsLayoutComponent implements OnInit {
  bookDetailsJson!: book;
  availableRating = 3;
  ratingArr: Array<number> = [1, 2, 3, 4, 5];
  constructor(
    private acRoute: ActivatedRoute,
    private store: Store<bookState>
  ) {}

  ngOnInit(): void {
    this.acRoute.data.subscribe((booksData) => {
      this.bookDetailsJson = { ...booksData[0] };
      this.availableRating = this.bookDetailsJson.volumeInfo?.rating || 0;
    });
  }

  addToCart(): void {
    this.store.dispatch(addToCart({ book: this.bookDetailsJson }));
  }
}
