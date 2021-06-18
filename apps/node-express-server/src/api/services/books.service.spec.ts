import * as bookService from './books.service';

describe('BooksService', () => {
  it('check if response has book list', (done) => {
    bookService.default.getBooks({ q: 'ang' }).then((data) => {
      expect(data.body.totalItems).toBeGreaterThan(0);
      done();
    });
  });

  it('check if response has book list', (done) => {
    bookService.default.getBooksById('D3wqAQAAMAAJ').then((data) => {
      expect(data.body.id).toBe('D3wqAQAAMAAJ');
      done();
    });
  });
});
