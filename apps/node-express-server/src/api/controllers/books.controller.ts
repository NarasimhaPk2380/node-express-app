import { Request, Response } from 'express';
import { objectExtraction } from '../../utils';
import booksService from '../services/books.service';

export default {
  getBooks: async (req: Request, res: Response) => {
    try {
      const booksApiRes = await booksService.getBooks(
        req.query as { q: string }
      );
      const booksRes = { ...booksApiRes.body };
      !booksRes.items ? (booksRes.items = []) : '';
      return res.json(objectExtraction(booksRes)).status(200);
    } catch (e) {
      return res.json({ err: e?.message }).status(500);
    }
  },
  getBooksById: async (req: Request, res: Response) => {
    try {
      const bookId = req.params?.bookId;
      const bookApiRes = await booksService.getBooksById(bookId);
      return res
        .json(
          objectExtraction(
            {
              items: [bookApiRes.body],
              totalItems: 0,
            },
            bookId
          )
        )
        .status(200);
    } catch (e) {
      return res.json({ err: e?.message }).status(200);
    }
  },
};
