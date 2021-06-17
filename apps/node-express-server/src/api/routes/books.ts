import { Router } from 'express';
import booksController from '../controllers/books.controller';

const router = Router();
export default (app: Router) => {
  app.use('/books', router);
  router.get('/', booksController.getBooks);
  router.get('/:bookId', booksController.getBooksById);
};
