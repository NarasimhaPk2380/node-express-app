import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCollectionLayoutComponent } from './my-collection-layout/my-collection-layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyCollectionLayoutComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MyCollectionLayoutComponent],
})
export class MyCollectionModule {}
