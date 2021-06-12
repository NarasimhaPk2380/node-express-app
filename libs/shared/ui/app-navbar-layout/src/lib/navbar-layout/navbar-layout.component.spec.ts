import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { of } from 'rxjs';
import { NavbarLayoutComponent } from './navbar-layout.component';
const BooksFacadeMock = {
  cartItems$: of([{ id: '1' }]),
};
describe('NavbarLayoutComponent', () => {
  let component: NavbarLayoutComponent;
  let fixture: ComponentFixture<NavbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarLayoutComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      providers: [{ provide: BooksFacade, useValue: BooksFacadeMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(BooksFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display cartitems length as one', () => {
    expect(component.availableCartItem).toBe(1);
  });
});
