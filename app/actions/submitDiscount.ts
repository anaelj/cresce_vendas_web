'use server';

import { Product } from "../types/discount";
import { loadProducts } from "./loadDiscounts";

export async function actionSubmitDiscount(data : any) {
    
   const getMaxId = (products: Product[]): string => {
      return products.reduce((maxId: any, product: Product) =>
        Number(product.id) > Number(maxId) ? product.id : maxId,
        "0"
      );
    };

    const products = await loadProducts();

    const maxId = getMaxId(products);

   const response = await fetch(`${process.env.REACT_APP_API}/discounts`, {
      method: 'POST',
      body: JSON.stringify({id: String(Number(maxId)+1), ...data}),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   if (!response.ok) {
      throw new Error('Failed to submit discount');
   }

   return response.json();
}
