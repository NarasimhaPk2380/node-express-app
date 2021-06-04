import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartItemsLayoutComponent } from './my-cart-items-layout/my-cart-items-layout.component';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyCartItemsLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexCardsLayoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MyCartItemsLayoutComponent],
})
export class MyCartItemsModule {}
