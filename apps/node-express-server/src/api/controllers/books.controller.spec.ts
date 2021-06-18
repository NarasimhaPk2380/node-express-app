import * as request from 'supertest';

describe('GET /api/books', () => {
  let server;
  beforeEach(() => {
    server = require('../../main');
  });
  afterAll(() => {
    server.close();
  });
  it('responds to /', (done) => {
    request(server).get('/api/books/').expect(200, done);
  });

  it('should throw error not found', (done) => {
    request(server).get('/').expect(404, done);
  });

  it('Check if books list api response has items', (done) => {
    request(server)
      .get('/api/books?q=ang')
      .then((res) => {
        expect(res.body).toHaveProperty('items');
        done();
      });
  });

  it('Check if books list api response has no items', (done) => {
    request(server)
      .get('/api/books?q=uygkjhjhgmjhgcdcgfcvcgrdtrdtfgyhj')
      .then((res) => {
        expect(res.body.items.length).toBe(0);
        done();
      });
  });

  it('Check if book details are available for a particular bookId', (done) => {
    request(server)
      .get('/api/books/D3wqAQAAMAAJ')
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe('D3wqAQAAMAAJ');
        done();
      });
  });

  it('Check if data shows error when particular book id is not available', (done) => {
    request(server).get('/api/books/av').expect(200, done);
  });
});
