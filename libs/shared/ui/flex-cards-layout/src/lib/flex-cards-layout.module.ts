import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardsLayoutComponent } from './cards-layout/cards-layout.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: [CardsLayoutComponent],
  exports: [CardsLayoutComponent],
})
export class FlexCardsLayoutModule {}
