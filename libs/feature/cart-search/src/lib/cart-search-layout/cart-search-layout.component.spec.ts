import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSearchLayoutComponent } from './cart-search-layout.component';

describe('CartSearchLayoutComponent', () => {
  let component: CartSearchLayoutComponent;
  let fixture: ComponentFixture<CartSearchLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSearchLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
