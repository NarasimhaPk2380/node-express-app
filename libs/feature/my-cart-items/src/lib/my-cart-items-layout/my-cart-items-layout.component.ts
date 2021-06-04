import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { bookI } from '@buyonline/shared/data-access/models';

@Component({
  selector: 'buyonline-my-cart-items-layout',
  templateUrl: './my-cart-items-layout.component.html',
  styleUrls: ['./my-cart-items-layout.component.scss'],
})
export class MyCartItemsLayoutComponent implements OnInit {
  cartItemsList: Array<bookI> = [];
  constructor(private utilsSrvc: UtilsService, private router: Router) {
    this.updateCartItems();
  }

  ngOnInit(): void {}

  updateCartItems(): void {
    this.cartItemsList = [
      ...(this.utilsSrvc.modifybooksAppJson?.cartItems || []),
    ];
  }
}
