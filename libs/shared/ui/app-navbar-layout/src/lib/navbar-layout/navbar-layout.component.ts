import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BooksFacade } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss'],
})
export class NavbarLayoutComponent implements OnInit {
  availableCartItem = 0;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private booksFacade: BooksFacade) {}

  ngOnInit(): void {
    this.booksFacade.cartItems$.subscribe((data) => {
      this.availableCartItem = data.length;
    });
  }
}
