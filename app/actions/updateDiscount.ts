'use server';

export async function actionUpdateDiscount(data : any) {
    
      const responseProduct = await fetch(`https://fakestoreapi.com/products/${data.id}`,{
      method: "PUT",
      body:JSON.stringify(
            {
               title: data?.title,
               price: data?.price,
               description: data?.description,
               image: data?.image,
            }
      ),
      });

      const productData = await responseProduct.json();      
      
      const discountResponse = await fetch(`${process.env.REACT_APP_API}/discounts?id=${productData.id.toString()}`);
      
      let discountData;
      if (discountResponse.ok) discountData = await discountResponse.json();
      
      const body = JSON.stringify({...data, id: productData.id.toString()});
      

      let newResponseDiscount;
      if (discountData && discountData[0]?.id) {
         newResponseDiscount = await fetch(`${process.env.REACT_APP_API}/discounts/${discountData[0]?.id.toString()}`, {
            method: 'PUT',
            body,
            headers: {
               'Content-Type': 'application/json',
            },
         });

      } else {
         newResponseDiscount = await fetch(`${process.env.REACT_APP_API}/discounts`, {
            method: 'POST',
            body,
            headers: {
               'Content-Type': 'application/json',
            },
         });

      }
      const newDiscountData = await newResponseDiscount.json();

      return {...newDiscountData};

}
