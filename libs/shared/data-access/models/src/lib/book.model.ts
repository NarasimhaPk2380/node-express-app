export interface appSubject {
  type: string;
  value: any;
}

export interface book {
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

export interface billingAddress {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface booksApp {
  cartItems: Array<book>;
  myCollection: Array<book>;
  billingAddress: billingAddress | {};
  searchedText?: string;
}
