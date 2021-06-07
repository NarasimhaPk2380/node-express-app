import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CardsLayoutComponent } from './cards-layout.component';

class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) {}
}

describe('CardsLayoutComponent', () => {
  let component: CardsLayoutComponent;
  let fixture: ComponentFixture<CardsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsLayoutComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useClass: RouterStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToDetailsPage(bookId: string)', () => {
    spyOn(component, 'goToDetailsPage').and.callThrough();
    component.goToDetailsPage('2222');
    // fixture.detectChanges();
    expect(component.goToDetailsPage).toHaveBeenCalled();
  });

  it('should call deleteCartItem(bookId: string)', () => {
    spyOn(component, 'deleteCartItem').and.callThrough();
    component.deleteCartItem('1');
    expect(component.deleteCartItem).toHaveBeenCalled();
  });

  it('should call deleteCartItem(bookId: string)', () => {
    spyOn(component, 'deleteCartItem').and.callThrough();
    component.deleteCartItem('1');
    expect(component.deleteCartItem).toHaveBeenCalled();
  });

  it('should call trackByMethod(index: number, el: any)', () => {
    spyOn(component, 'trackByMethod').and.callThrough();
    component.trackByMethod(1, { id: 'yyy' });
    expect(component.trackByMethod).toHaveBeenCalled();
  });
});
