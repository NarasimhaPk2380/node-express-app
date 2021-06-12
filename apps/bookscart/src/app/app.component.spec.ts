import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { AppNavbarLayoutModule } from '@buyonline/shared/ui/app-navbar-layout';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const BooksFacadeMock = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        AppNavbarLayoutModule,
      ],
      providers: [{ provide: BooksFacade, useValue: BooksFacadeMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
