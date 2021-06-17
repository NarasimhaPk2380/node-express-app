import { bookApi, book } from '@buyonline/shared/data-access/models';

export class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const objectExtraction = (bookJson: bookApi, bookId?: string) => {
  if (bookId) {
    const {
      id,
      volumeInfo: {
        title,
        rating,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        ratingsCount,
        pageCount,
        language,
        imageLinks: { smallThumbnail, thumbnail } = {},
      },
    } = bookJson.items[0];
    return {
      id,
      volumeInfo: {
        title,
        rating,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        ratingsCount,
        pageCount,
        language,
        imageLinks: { smallThumbnail, thumbnail },
      },
    };
  }
  let { items } = bookJson;
  items = items.map((bookItem: book) => {
    const {
      id,
      volumeInfo: {
        title,
        rating,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        ratingsCount,
        pageCount,
        language,
        imageLinks: { smallThumbnail = '', thumbnail = '' } = {},
      },
    } = bookItem;
    return {
      id,
      volumeInfo: {
        title,
        rating,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        ratingsCount,
        pageCount,
        language,
        imageLinks: { smallThumbnail, thumbnail },
      },
    };
  });
  return { ...bookJson, items };
};
