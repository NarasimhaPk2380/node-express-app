import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StarRatingModule } from '@buyonline/shared/pipes/star-rating';
import { Observable, of } from 'rxjs';

import { CartDetailsLayoutComponent } from './cart-details-layout.component';

class ActivatedRouteStub {
  data = of([{ id: '12', volumeInfo: { rating: 2 } }]);
}

describe('CartDetailsLayoutComponent', () => {
  let component: CartDetailsLayoutComponent;
  let fixture: ComponentFixture<CartDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsLayoutComponent],
      imports: [StarRatingModule],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteStub }],
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
  it('should invoke addToCart() and display rating', () => {
    spyOn(component, 'addToCart').and.callThrough();
    component.addToCart();
    expect(component.addToCart).toHaveBeenCalled();
    expect(component.availableRating).toBe(2);
  });
});
