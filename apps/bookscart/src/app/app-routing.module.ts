import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemResolverService } from '@buyonline/shared/data-access/services';

const routes: Routes = [
  {
    path: 'cart-search',
    loadChildren: () =>
      import('@buyonline/feature/cart-search').then((m) => m.CartSearchModule),
  },
  {
    path: 'my-cart',
    loadChildren: () =>
      import('@buyonline/feature/my-cart-items').then(
        (m) => m.MyCartItemsModule
      ),
  },
  {
    path: 'cart-details/:bookId',
    loadChildren: () =>
      import('@buyonline/feature/cart-details').then(
        (m) => m.CartDetailsModule
      ),
    resolve: [CartItemResolverService],
  },
  {
    path: 'my-collection',
    loadChildren: () =>
      import('@buyonline/feature/my-collection').then(
        (m) => m.MyCollectionModule
      ),
  },
  {
    path: '',
    redirectTo: '/cart-search',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/cart-search',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
