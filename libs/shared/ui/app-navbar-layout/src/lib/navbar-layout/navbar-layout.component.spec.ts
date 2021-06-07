import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from '@buyonline/shared/data-access/services';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { of } from 'rxjs';
import { NavbarLayoutComponent } from './navbar-layout.component';
const UtilsServiceMock = {
  bookAppSubject$: of({ type: 'addToCart', value: '' }),
  modifybooksAppJson: {
    cartItems: [
      {
        id: '1',
      },
    ],
  },
};
describe('NavbarLayoutComponent', () => {
  let component: NavbarLayoutComponent;
  let fixture: ComponentFixture<NavbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarLayoutComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      providers: [
        {
          provide: UtilsService,
          useValue: UtilsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display cartitems length as one', () => {
    expect(component.availableCartItem).toBe(1);
  });
});
