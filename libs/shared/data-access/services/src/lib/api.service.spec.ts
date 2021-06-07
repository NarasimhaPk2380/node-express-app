import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { book } from '@buyonline/shared/data-access/models';
import { ApiService } from '@buyonline/shared/data-access/services';
describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let baseUrl: string = 'https://www.googleapis.com/books/v1/volumes';
  let book = {
    id: 2,
    volumeInfo: {
      title: 'Angular',
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should call api request', () => {
    let result: book[] = [];
    service.apiRequest('GET', {}, {}).subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl,
    });

    req.flush([book]);
    expect(result[0]).toEqual(book);
  });
  it('Should call api request if id is given', () => {
    let result: book[] = [];
    service.apiRequest('GET', { id: '1' }, {}).subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/1`,
    });

    req.flush([book]);
    expect(result[0]).toEqual(book);
  });
});
