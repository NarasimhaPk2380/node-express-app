import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './+state/books.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './+state/books.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('book', booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
})
export class BooksStateModule {}
