import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a simple string', () => {
    const pipe = new CapitalizePipe();

    expect(pipe.transform('angular')).toBe('Angular');
  });

  it('should return an empty string for null or undefined input', () => {
    const pipe = new CapitalizePipe();

    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});
