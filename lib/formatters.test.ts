import { formatPrice, formatDiscount } from './formatters';

describe('formatPrice', () => {
  it('should format the price correctly', () => {
    expect(formatPrice(1234.56)).toBe('R$ 1.234,56');
  });

  it('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('R$ 0,00');
  });
});

describe('formatDiscount', () => {
  it('should format the discount correctly for number input', () => {
    expect(formatDiscount(12.34)).toBe('12%');
  });

  it('should format the discount correctly for string input', () => {
    expect(formatDiscount('12.34')).toBe('12%');
  });

  it('should format zero correctly', () => {
    expect(formatDiscount(0)).toBe('0%');
  });
});
