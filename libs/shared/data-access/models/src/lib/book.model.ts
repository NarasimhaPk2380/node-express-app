export interface appSubjectI {
  type: string;
  value: any;
}

export interface bookI {
  id: string;
  volumeInfo?: {
    title: string;
    rating: number;
    subtitle: string;
    authors: Array<string>;
    publisher: string;
    publishedDate: string;
    description: string;
    ratingsCount: number;
    pageCount: number;
    language: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

export interface billingAddressI {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface booksAppI {
  cartItems: Array<bookI>;
  myCollection: Array<bookI>;
  billingAddress: billingAddressI | {};
  searchedText?: string;
}
