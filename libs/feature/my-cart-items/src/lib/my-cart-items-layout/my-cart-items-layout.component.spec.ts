import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { MyCartItemsLayoutComponent } from './my-cart-items-layout.component';
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class RouterStub {
  url = '';
  navigate() {
    return;
  }
}

const BooksFacadeMock1 = {
  cartItems$: of([{ id: '1' }]),
};

const BooksFacadeMock2 = {
  cartItems$: of([]),
};

class StoreMock {
  dispatch() {
    return;
  }
}

describe('MyCartItemsLayoutComponent', () => {
  let component: MyCartItemsLayoutComponent;
  let fixture: ComponentFixture<MyCartItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCartItemsLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(BooksFacade, { useValue: BooksFacadeMock1 });
    fixture = TestBed.createComponent(MyCartItemsLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(BooksFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cartItems as one', () => {
    expect(component.cartItemsList.length).toBe(1);
  });
});

describe('Check if store has no cart items', () => {
  let component: MyCartItemsLayoutComponent;
  let fixture: ComponentFixture<MyCartItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCartItemsLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(BooksFacade, { useValue: BooksFacadeMock2 });
    fixture = TestBed.createComponent(MyCartItemsLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(BooksFacade);
    fixture.detectChanges();
  });

  it('should check cartitems is empty', () => {
    expect(component.cartItemsList.length).toBe(0);
  });

  it('should show cartItems is empty when there are no cart items', () => {
    fixture.detectChanges();
    const emptyEle = fixture.debugElement.query(By.css('#empty'));
    expect(emptyEle.nativeElement.textContent).toBe('Cart is empty');
  });
});
