import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemResolverService } from '@buyonline/shared/data-access/services';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () =>
      import('@buyonline/feature/search').then((m) => m.FeatureSearchModule),
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
    path: 'checkout',
    loadChildren: () =>
      import('@buyonline/feature/checkout').then((m) => m.CheckoutModule),
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/search',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
