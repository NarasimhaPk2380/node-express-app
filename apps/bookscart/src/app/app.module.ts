import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppNavbarLayoutModule } from '@buyonline/shared/ui/app-navbar-layout';
import { StoreModule } from '@ngrx/store';
import { BooksStateModule } from '@buyonline/shared/data-access/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppNavbarLayoutModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: true,
    }),
    BooksStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
