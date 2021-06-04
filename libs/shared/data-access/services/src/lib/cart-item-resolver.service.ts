import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { bookI } from '@buyonline/shared/data-access/models';
import { AppService } from '@buyonline/shared/data-access/services';

@Injectable({
  providedIn: 'root',
})
export class CartItemResolverService {
  constructor(private appSrvc: AppService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<bookI> | Promise<bookI> | any {
    return this.appSrvc.retrieveBookId(route.params?.bookId);
  }
}
