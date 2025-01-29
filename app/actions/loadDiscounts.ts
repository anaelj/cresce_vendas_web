'use server';

import { Product } from "../types/discount";

export const mergeProductDiscounts = async (
  products: Product[],
  discounts: Product[]
): Promise<Product[]> => {
  return products.map((product) => {
    const matchingDiscount = discounts.find(
      (discount) => Number(discount.id) === Number(product.id) 
    );

    if (matchingDiscount) 
      return {
        ...matchingDiscount
    }

    return product;
  }).concat(
    discounts.filter(discount => !products.find(product => Number(product.id) === Number(discount.id)))
  ).sort((a, b) => Number(b.id) - Number(a.id));
};


export async function loadProducts() {
  const responseProduct = await fetch(`https://fakestoreapi.com/products`);
  const productData = await responseProduct.json();

  const responseDiscount = await fetch(`${process.env.REACT_APP_API}/discounts`);
  let discountData = [];
  if (responseDiscount.ok) discountData = await responseDiscount.json();

  if (!responseProduct.ok) {
    throw new Error('Failed to submit discount');
  }

  const mergedData = (await mergeProductDiscounts(productData, discountData));

  return mergedData;
}
