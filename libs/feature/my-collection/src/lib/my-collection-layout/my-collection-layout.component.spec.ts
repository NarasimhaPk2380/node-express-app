import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { of } from 'rxjs';
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { Store } from '@ngrx/store';
import { MyCollectionLayoutComponent } from './my-collection-layout.component';
import { By } from '@angular/platform-browser';

class RouterStub {
  url = '';
  navigate() {
    return;
  }
}

const BooksFacadeMock1 = {
  myCollection$: of([{ id: '1' }]),
};

const BooksFacadeMock2 = {
  myCollection$: of([]),
};

class StoreMock {
  dispatch() {
    return;
  }
}

describe('MyCollectionLayoutComponent', () => {
  let component: MyCollectionLayoutComponent;
  let fixture: ComponentFixture<MyCollectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCollectionLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(BooksFacade, { useValue: BooksFacadeMock1 });
    fixture = TestBed.createComponent(MyCollectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display mycollection as one', () => {
    expect(component.myCollectionList.length).toBe(1);
  });
});

describe('Check if store has no mycollection items', () => {
  let component: MyCollectionLayoutComponent;
  let fixture: ComponentFixture<MyCollectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCollectionLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(BooksFacade, { useValue: BooksFacadeMock2 });
    fixture = TestBed.createComponent(MyCollectionLayoutComponent);
    component = fixture.componentInstance;
    TestBed.inject(BooksFacade);
    fixture.detectChanges();
  });

  it('should check cartitems is empty', () => {
    expect(component.myCollectionList.length).toBe(0);
  });

  it('should show cartItems is empty when there are no cart items', () => {
    fixture.detectChanges();
    const emptyEle = fixture.debugElement.query(By.css('#empty'));
    expect(emptyEle.nativeElement.textContent).toBe('Collection is empty');
  });
});
