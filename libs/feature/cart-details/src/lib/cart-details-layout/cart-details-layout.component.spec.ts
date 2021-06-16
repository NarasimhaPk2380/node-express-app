import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StarRatingModule } from '@buyonline/shared/pipes/star-rating';
import { of } from 'rxjs';
import { BooksFacade } from '@buyonline/shared/data-access/state';

import { CartDetailsLayoutComponent } from './cart-details-layout.component';

describe('CartDetailsLayoutComponent', () => {
  let component: CartDetailsLayoutComponent;
  let fixture: ComponentFixture<CartDetailsLayoutComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let actions$ = new Observable<any>();
  const booksFacade = {
    addToCart: jasmine.createSpy('addToCart'),
    bookDetails$: of({ id: '12', volumeInfo: { publisher: 'abc' } }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsLayoutComponent],
      imports: [StarRatingModule],
      providers: [{ provide: BooksFacade, useValue: booksFacade }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should click addToCart and check count of cartItems', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.add-to-cart'));
    buttonElement.nativeElement.click();
    expect(booksFacade.addToCart).toHaveBeenCalled();
  });

  it('should add the items to the cart when user clicks buy', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.checkout'));
    buttonElement.nativeElement.click();
    // expect(utilsSrvc.booksAppJson?.cartItems?.length).toBe(1);
  });
  it('should check publisher is rendered', () => {
    fixture.detectChanges();
    const ratingEle = fixture.debugElement.query(By.css('.publisher'));
    expect(ratingEle.nativeElement.textContent).toBe('abc');
  });
});
