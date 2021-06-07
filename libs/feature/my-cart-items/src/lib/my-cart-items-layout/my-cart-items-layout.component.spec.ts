import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { MyCartItemsLayoutComponent } from './my-cart-items-layout.component';
class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) {}
}
describe('MyCartItemsLayoutComponent', () => {
  let component: MyCartItemsLayoutComponent;
  let fixture: ComponentFixture<MyCartItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCartItemsLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [{ provide: Router, useClass: RouterStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke updateCartItems()', () => {
    spyOn(component, 'updateCartItems').and.callThrough();
    component.updateCartItems();
    expect(component.updateCartItems).toHaveBeenCalled();
  });
});
