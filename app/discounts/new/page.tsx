'use client';


import { DiscountForm } from '@/app/components/discounts/DiscountForm';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { CompanyProvider } from '@/app/context/CompanyContext';
import { useRouter } from 'next/navigation';

export default function NewDiscountPage() {
  const router = useRouter();
  const handleSubmit = async () => {
    router.push('/discounts');
  };

  return (
    <CompanyProvider>
      <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row justify-start">
        <Sidebar />
        <main className="flex-1 justify-start">
          <DiscountForm onSubmit={handleSubmit} />
        </main>
      </div>
    </CompanyProvider>
  );
}