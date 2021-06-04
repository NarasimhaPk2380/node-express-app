import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartItemsLayoutComponent } from './my-cart-items-layout.component';

describe('MyCartItemsLayoutComponent', () => {
  let component: MyCartItemsLayoutComponent;
  let fixture: ComponentFixture<MyCartItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCartItemsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
