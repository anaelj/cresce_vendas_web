import { cn } from './utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional class names correctly', () => {
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  it('should handle undefined and null values correctly', () => {
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
  });
});
