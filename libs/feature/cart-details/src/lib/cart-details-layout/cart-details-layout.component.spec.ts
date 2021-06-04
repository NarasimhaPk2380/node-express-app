import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsLayoutComponent } from './cart-details-layout.component';

describe('CartDetailsLayoutComponent', () => {
  let component: CartDetailsLayoutComponent;
  let fixture: ComponentFixture<CartDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
