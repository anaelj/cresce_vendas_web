'use client';


import { DiscountForm } from '@/app/components/discounts/DiscountForm';
import { Sidebar } from '@/app/components/layout/Sidebar';
// import { DiscountForm } from '@/app/components/discounts/DiscountForm';
import { useRouter } from 'next/navigation';

export default function NewDiscountPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    
    // await fetch('/api/discounts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    router.push('/discounts');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        <DiscountForm onSubmit={handleSubmit} />
        {/* <DiscountForm  /> */}
      </main>
    </div>
  );
}