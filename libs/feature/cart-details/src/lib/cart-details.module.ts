import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { StarRatingModule } from '@buyonline/shared/pipes/star-rating';
import { CartDetailsLayoutComponent } from './cart-details-layout/cart-details-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CartDetailsLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StarRatingModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CartDetailsLayoutComponent],
})
export class CartDetailsModule {}
