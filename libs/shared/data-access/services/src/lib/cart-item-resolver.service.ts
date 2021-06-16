import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { book } from '@buyonline/shared/data-access/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartItemResolverService {
  constructor(private booksFacade: BooksFacade) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> {
    this.booksFacade.retrieveBookDetails(route.params.bookId);
    return this.booksFacade.waitForLoadingBookDetails();
  }
}
