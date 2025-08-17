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
});
