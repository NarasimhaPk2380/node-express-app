import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { NavbarLayoutComponent } from './navbar-layout/navbar-layout.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [NavbarLayoutComponent],
  exports: [NavbarLayoutComponent],
})
export class AppNavbarLayoutModule {}
