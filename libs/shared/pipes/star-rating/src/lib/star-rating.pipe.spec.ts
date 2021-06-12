import { StarRatingPipe } from './star-rating.pipe';
describe('StarRatingPipe', () => {
  let pipe: StarRatingPipe;
  it('create an instance', () => {
    pipe = new StarRatingPipe();
    expect(pipe).toBeTruthy();
  });
  it('should display bordered star', () => {
    const result = pipe.transform('1', '1');
    expect(result).toBe('star_border');
  });
  it('should display filled color star', () => {
    const pipe = new StarRatingPipe();
    const result1 = pipe.transform('1', '2');
    expect(result1).toBe('star');
  });
});
