import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { CartSearchLayoutComponent } from './cart-search-layout/cart-search-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CartSearchLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FlexCardsLayoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CartSearchLayoutComponent],
})
export class CartSearchModule {}
