import { TestBed } from '@angular/core/testing';
import { CartItemResolverService } from '@buyonline/shared/data-access/services';
xdescribe('CartItemResolverService', () => {
  let service: CartItemResolverService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemResolverService);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });
});
