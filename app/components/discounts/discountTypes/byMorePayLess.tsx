import { Product } from '@/app/types/discount'
import { formatPrice } from '@/lib/formatters';
import React from 'react'

interface DiscountProps  {
  product : Product;
}

export default function ByMorePayLessDiscount({product} : DiscountProps) {
  return (
    <div className='gap-4'>
      {product?.discount?.buyQuantity && product?.discount?.payQuantity && (
          <>
            <p className='text-font-dark text-[24px] font-medium'>{`Leve ${product.discount.buyQuantity} Pague ${product.discount.payQuantity}`} </p>
            <p className='text-font-light text-[18px]'>{product.title}</p>
            <p className='text-font-light text-[14px]'>{product.description}</p>
            <p className='text-font-dark text-[24px] font-medium mt-4'>{formatPrice(product.price!)}</p>
          </>
      )}
      </div>
  )
}


