import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { book } from '@buyonline/shared/data-access/models';
import { bookState, deleteFromCart } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-cards-layout',
  templateUrl: './cards-layout.component.html',
  styleUrls: ['./cards-layout.component.scss'],
})
export class CardsLayoutComponent {
  @Input() cardsList: Array<book> = [];
  @Input() showDelete = 'false';
  // @Output() getEventFromCard = new EventEmitter();

  constructor(private router: Router, public store: Store<bookState>) {}

  goToDetailsPage(bookId: string) {
    this.router.navigate([`/cart-details/${bookId}`]);
  }

  deleteCartItem(bookId: string) {
    this.store.dispatch(deleteFromCart({ bookId }));
    // this.getEventFromCard.emit('');
  }

  trackByMethod(index: number, el: book): string {
    return el.id;
  }
}
