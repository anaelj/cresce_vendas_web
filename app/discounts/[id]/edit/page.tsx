'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { DiscountForm } from '@/app/components/discounts/DiscountForm';
import { useRouter } from 'next/navigation';
import {  Product } from '@/app/types/discount';
import { showDiscount } from '@/app/actions/showDiscount';

export default function EditDiscountPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  const id = params.id;
  const fetchDiscount = async () => {
    const data = await showDiscount(id);
    setProduct(data);
  }

  const handleSubmit = async () => {

    router.push('/discounts'); 
  }

  useEffect(() => {
    fetchDiscount();
  }, []);

   if (!product) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        <DiscountForm initialData={product} onSubmit={handleSubmit} />
      </main>
    </div>
  );
}