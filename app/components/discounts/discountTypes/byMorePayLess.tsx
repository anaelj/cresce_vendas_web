import { Product } from '@/app/types/discount'
import { formatDiscount, formatPrice } from '@/lib/formatters';
import React from 'react'

interface DiscountProps  {
  product : Product;
}

export default function ByMorePayLessDiscount({product} : DiscountProps) {
  return (
    <div className='gap-4'>
      {product?.discount?.buyQuantity && product?.discount?.payQuantity && (
          <>
            <p className='text-font-dark text-[24px] font-bold'>{`Leve ${product.discount.buyQuantity} Pague ${product.discount.payQuantity}`} </p>
            <p className='text-font-medium text-[18px]'>{product.title}</p>
            <p className='text-font-medium text-[14px]'>{product.description}</p>
            <p className='text-font-dark text-[24px] font-bold mt-4'>{formatPrice(product.price!)}</p>
          </>
      )}
      </div>
  )
}


