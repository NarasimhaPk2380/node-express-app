import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import { BooksFacade } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-my-cart-items-layout',
  templateUrl: './my-cart-items-layout.component.html',
  styleUrls: ['./my-cart-items-layout.component.scss'],
})
export class MyCartItemsLayoutComponent implements OnInit {
  cartItemsList: Array<book> = [];
  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit(): void {
    this.booksFacade.cartItems$.subscribe((data) => {
      this.cartItemsList = [...data];
    });
  }
}
