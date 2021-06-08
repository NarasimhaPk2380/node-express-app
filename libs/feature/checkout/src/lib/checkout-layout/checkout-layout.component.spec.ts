import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutLayoutComponent } from './checkout-layout.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@buyonline/shared/ui/material';
import { of } from 'rxjs';
// class RouterStub {
//   url = '';
//   navigate(commands: any[], extras?: any) {}
// }
class MatSnackBarMock {
  open(str: string, str1: string, options: any) {
    return {
      OnAction() {
        return of();
      },
    };
  }
}
describe('CheckoutLayoutComponent', () => {
  let component: CheckoutLayoutComponent;
  let fixture: ComponentFixture<CheckoutLayoutComponent>;
  let matService: MatSnackBar;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutLayoutComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useClass: MatSnackBarMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLayoutComponent);
    component = fixture.componentInstance;
    matService = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke submitCheckout()', () => {
    spyOn(component, 'submitCheckout').and.callThrough();
    spyOn(component.snackBar, 'open').and.returnValue({
      onAction() {
        return of();
      },
    });
    // spyOn(mockRouter, 'navigate').and.callThrough();
    component.submitCheckout();
    expect(component.submitCheckout).toHaveBeenCalled();
    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/my-collection']);
    });
  });

  it('checkout form invalid when empty', () => {
    expect(component.checkoutForm.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let errors: any = {};
    let email = component.checkoutForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });
});
