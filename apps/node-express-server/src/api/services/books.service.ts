import * as superagent from 'superagent';
import { book, bookApi } from '@buyonline/shared/data-access/models';
export default {
  getBooks({ q }: { q: string }): Promise<{ body: bookApi }> {
    return superagent
      .get('https://www.googleapis.com/books/v1/volumes')
      .query({ q });
  },
  getBooksById(bookId: string): Promise<{ body: book }> {
    return superagent.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );
  },
};
