'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Eye, GripVertical } from 'lucide-react';
// import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Product  } from '@/app/types/discount';
import Image from 'next/image';
import { ViewDiscountModal } from './ViewDiscountModal';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

interface DiscountListProps {
  products: Product[];
  onStatusChange: (id: string, active: boolean) => void;
}

export function DiscountList({ products, onStatusChange }: DiscountListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const companyName = 'Loja: Super João - Nova loja online';
  
  const filteredProducts = products.filter(product => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && product?.discount?.status) ||
      (statusFilter === 'inactive' && !product?.discount?.status);
    const matchesType = typeFilter === 'all' || typeFilter === product?.discount?.type;
    return matchesStatus && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 mt-24">
        <div>
            <h1 className="text-[32px] font-bold text-font-light">Lista de descontos</h1>
            <h2 className="text-[14px] text-font-light">{companyName} </h2>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 bg-white rounded-t-lg" >
        <div className="flex gap-4 justify-between p-3 border-b items-center">
          <span className='text-font-light'>Descontos cadastrados</span>
          <Link href="/discounts/new">
            <Button className='bg-background_sidebar text-[16px] font-normal'>
              Novo Desconto
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 w-full p-3 pb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy-more-pay-less">Leve + Pague-</SelectItem>
              <SelectItem value="percentage">Percentual</SelectItem>
              <SelectItem value="from-to">De Por</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center p-4 bg-[#F1F4F5] text-font-medium">
        <p className="flex-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">Desconto</p>
        <p className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[180px]">Tipo</p>
        <p className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[180px]">Data Ativação</p>
        <p className="w-full max-w-[100px] sm:max-w-[150px] md:max-w-[180px]">Data Inativação</p>
        <p className="w-full max-w-[50px] sm:max-w-[70px] md:max-w-[100px]">Status</p>
      </div>


      <div className="bg-white rounded-b-lg shadow w-full">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex items-center p-4 border-b last:border-b-0">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
            <div className="min-w-[50px] w-[50px] h-[50px] relative mx-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <p className="font-medium">{product.title}</p>
              <p className="font-medium">{product.description}</p>
            </div>
            <div className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[180px]">
              <p className="text-sm text-gray-500">{product?.discount?.type}</p>
            </div>
              <div className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[185px]">
                {/* <p className="text-sm text-gray-500">Ativação</p> */}
                <p>{product?.discount?.startDate && new Date(product?.discount?.startDate).toLocaleDateString()}</p>
              </div>
              <div className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[185px]">
                {/* <p className="text-sm text-gray-500">Inativação</p> */}
                <p>{product?.discount?.endDate && new Date(product?.discount?.endDate).toLocaleDateString()}</p>
              </div>
              <Switch checked={product?.discount?.status }
                onCheckedChange={(checked) => onStatusChange(product.id, checked)}  />
             
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProduct(product)}
                
              >
                <img src='assets/Eye.png' className='min-w-[28px]'/>
              </Button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ViewDiscountModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}