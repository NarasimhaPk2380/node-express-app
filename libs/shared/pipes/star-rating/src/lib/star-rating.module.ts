import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingPipe } from './star-rating.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [StarRatingPipe],
  exports: [StarRatingPipe],
})
export class StarRatingModule {}
