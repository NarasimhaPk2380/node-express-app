import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CartItemResolverService } from './cart-item-resolver.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BooksFacade } from '@buyonline/shared/data-access/state';
import { delay, filter, take } from 'rxjs/operators';

class BooksFacadeMock {
  retrieveBookDetails(bookId: string) {
    return of({ bookId });
  }
  waitForLoadingBookDetails() {
    return of(false).pipe(
      delay(1000),
      filter((loaded) => !loaded),
      take(1)
    );
  }
}

fdescribe('CartItemResolverService', () => {
  let resolver: CartItemResolverService;
  let service: BooksFacade;
  let route: ActivatedRoute;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartItemResolverService,
        [
          {
            provide: BooksFacade,
            useClass: BooksFacadeMock,
          },
        ],
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                bookId: '1',
              },
            },
          },
        },
      ],
    });
  });

  beforeEach(() => {
    resolver = TestBed.inject(CartItemResolverService);
    service = TestBed.inject(BooksFacade);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call retrieveBookId for getting the bookdetails', () => {
    spyOn(service, 'retrieveBookDetails').and.callThrough();
    resolver.resolve(route.snapshot);
    expect(service.retrieveBookDetails).toHaveBeenCalled();
  });
});
