import { Product } from '@/app/types/discount'
import { formatDiscount, formatPrice } from '@/lib/formatters';
import React from 'react'

interface DiscountPercentageProps  {
  product : Product;
}

export default function DiscountPercentage({product} : DiscountPercentageProps) {
  return (
    <div className='gap-4'>
      {product?.discount?.percentageDiscount && product?.price && (
          <>
            <p className='text-font-dark text-[24px] font-bold'>{`${formatDiscount(product.discount.percentageDiscount)} OFF`} </p>
            <p className='text-font-medium text-[18px]'>{product.title}</p>
            <p className='text-font-medium text-[14px]'>{product.description}</p>
            <p className='text-font-dark text-[18px] line-through font-bold mt-4'>{formatPrice(product.price)}</p>
            <p className='text-font-dark text-[24px] font-bold'>{formatPrice(product.price - (product.price * (product.discount.percentageDiscount / 100)))}</p>
          </>
      )}
      </div>
  )
}


