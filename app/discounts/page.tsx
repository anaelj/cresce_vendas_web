'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { DiscountList } from '@/app/components/discounts/DiscountList';
import { Product } from '@/app/types/discount';
import { loadProducts } from '../actions/loadDiscounts';
import { actionUpdateDiscount } from '../actions/updateDiscount';

export default function DiscountsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    const data = await loadProducts();
    setProducts(data);
    
  };

  const handleStatusChange = async (id: string, active: boolean) => {
    
    const data = products.find( (product : Product) => Number(product.id) === Number(id));

    await actionUpdateDiscount({
      ...data,
      discount: {
        ...data?.discount, status: active
      }

    })

    fetchDiscounts();
  };

  return (
    <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row justify-start">
      
      <Sidebar />
      
      <main className="flex-1 mt-16 md:mt-0">
        <DiscountList
          products={products}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}