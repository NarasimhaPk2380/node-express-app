import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyCollectionLayoutComponent } from './my-collection-layout/my-collection-layout.component';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexCardsLayoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MyCollectionLayoutComponent],
})
export class MyCollectionModule {}
