import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CheckoutLayoutComponent } from './checkout-layout/checkout-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CheckoutLayoutComponent],
})
export class CheckoutModule {}
