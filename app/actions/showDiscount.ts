'use server';

export async function showDiscount(id : string) {
    
   const responseProduct = await fetch(`https://fakestoreapi.com/products/${id}`);

   let productData ;
   if (responseProduct?.ok) {
      const hasText = await responseProduct.text();
      if (hasText) {
         productData = JSON.parse(hasText);
      }
   }
  
   const responseDiscount = await fetch(`http://localhost:3333/discounts/${id.toString()}`);
  
   let discountData;
   if (responseDiscount.ok) discountData = await responseDiscount.json();

   if (!responseProduct?.ok) {
      throw new Error('Failed to submit discount');
   }

   return {...productData, ...discountData};
}
