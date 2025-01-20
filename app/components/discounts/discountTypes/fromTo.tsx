import { Product } from '@/app/types/discount'
import { formatPrice } from '@/lib/formatters';
import React from 'react'

interface DiscountProps  {
  product : Product;
}

export default function DiscountFromTo({product} : DiscountProps) {
  return (
    <div className='gap-4'>
      {product?.discount?.fromPrice && product?.discount?.toPrice && (
          <>
            <p className='text-font-medium text-[18px]'>{product.title}</p>
            <p className='text-font-medium text-[14px]'>{product.description}</p>
            <p className='text-font-dark text-[18px] line-through font-bold mt-4'>{`de ${formatPrice(product.discount.fromPrice)}`}</p>
            <p className='text-font-dark text-[24px] font-bold'>{`por ${formatPrice(product.discount.toPrice)}`}</p>
          </>
      )}
      </div>
  )
}


