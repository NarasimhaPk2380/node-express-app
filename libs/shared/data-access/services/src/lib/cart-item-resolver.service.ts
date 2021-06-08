import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { book } from '@buyonline/shared/data-access/models';
import { CartService } from '@buyonline/shared/data-access/services';

@Injectable({
  providedIn: 'root',
})
export class CartItemResolverService {
  constructor(private cartSrvc: CartService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<book> | Promise<book> | any {
    return this.cartSrvc.retrieveBookId(route.params?.bookId);
  }
}
