import { objectExtraction } from './index';
import { bookApi } from '@buyonline/shared/data-access/models';

describe('Utils functions', () => {
  it('check empty object assigned when no imagelinks', () => {
    const data = objectExtraction(
      {
        items: [{ id: '2', volumeInfo: {} }],
        totalItems: 1,
      },
      '1'
    );
    const data1 = objectExtraction({
      items: [
        { id: '2', volumeInfo: {} },
        { id: '3', volumeInfo: {} },
      ],
      totalItems: 1,
    }) as bookApi;
    expect(data.volumeInfo).toHaveProperty('imageLinks');
    expect(data1.items[0].volumeInfo).toHaveProperty('imageLinks');
  });
});
