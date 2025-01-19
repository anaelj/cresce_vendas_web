export type DiscountType = 'buy-more-pay-less' | 'percentage' | 'from-to';

export interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  image: string;
  discount?: Discount;
}

export interface Discount {
  type: DiscountType;
  status: boolean;
  startDate: string;
  endDate: string;
  fromPrice?: number;
  toPrice?: number;
  buyQuantity?: number;
  payQuantity?: number;
  percentageDiscount?: number;
  order: number;
}