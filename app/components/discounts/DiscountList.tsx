'use client';

import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Product  } from '@/app/types/discount';
import { ViewDiscountModal } from './ViewDiscountModal';
import { Switch } from '@/components/ui/switch';
import { useCompany } from '@/app/context/CompanyContext';
import { getDiscountDescription } from '@/lib/discount';

interface DiscountListProps {
  products: Product[];
  onStatusChange: (id: string, active: boolean) => void;
}

export function DiscountList({ products, onStatusChange }: DiscountListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { companyName } = useCompany();
  
  const filteredProducts = products.filter(product => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && product?.discount?.status) ||
      (statusFilter === 'inactive' && !product?.discount?.status);
    const matchesType = typeFilter === 'all' || typeFilter === product?.discount?.type;
    return matchesStatus && matchesType;
  });

  return (
    <div className="p-6 max-[500px]:p-1">
      <div className="flex justify-between items-center mb-6 md:mt-20">
        <div>
            <h1 className="text-[32px] font-medium text-font-light">Lista de descontos</h1>
            <h2 className="text-[14px] text-font-light">{companyName} </h2>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 bg-white rounded-t-lg" >
        <div className="flex gap-4 justify-between p-3 border-b items-center">
          <span className='text-font-light font-normal text-[20px]' >Descontos cadastrados</span>
          <Link href="/discounts/new">
            <Button className='bg-background_sidebar text-[16px] font-normal w-[200px]'>
              Novo desconto
            </Button>
          </Link>
        </div>

        <div className="flex gap-4 w-full p-3 pb-6">
          <div className='flex flex-col w-full'>
          <label htmlFor="status-filter" className="text-[16px] font-normal text-[#455a64] pb-2">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter} defaultValue="all">
                <SelectTrigger id="status-filter" className="w-full">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div className='flex flex-col w-full'>
          <label className="text-[16px] font-normal text-[#455a64] pb-2">Tipo desconto</label>
          <Select value={typeFilter} onValueChange={setTypeFilter} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="buy-more-pay-less">Leve + Pague-</SelectItem>
              <SelectItem value="percentage">Percentual</SelectItem>
              <SelectItem value="from-to">De Por</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-[#F1F4F5] text-font-medium font-medium text-sm">
        <p className="flex-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" >Desconto</p>
        <p className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[180px] pl-1 ">Tipo</p>
        <p className="w-full max-w-[200px] pl-1 "> Data Ativação</p>
        <p className="w-full max-w-[100px] sm:max-w-[150px] md:max-w-[180px] ">Data Inativação</p>
        <p className="w-full max-w-[50px] sm:max-w-[70px] md:max-w-[100px]">Status</p>
      </div>


      <div className="bg-white rounded-b-lg shadow w-full text-font-dark text-sm">
        {filteredProducts.map((product) => (
          <div key={product.id} className="flex items-center p-4 border-b last:border-b-0">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move min-w-5" />
            <div className="min-w-[60px] w-[60px] h-[60px] mx-4 border border-[#E1E1E1] border-opacity-30 rounded-[5px] p-1 flex justify-center">
              <img
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="flex-1 flex-col">
              <p className='flex flex-wrap max-h-[133px]'>{product.title}</p>
              <p className="block md:hidden">{getDiscountDescription(product?.discount?.type)}</p>
              {/* <p className="hidden md:block">{product.description}</p> */}
            </div>
            <div className="w-full max-w-[220px] sm:max-w-[150px] md:max-w-[180px] hidden md:block">
              <p className="hidden md:block pl-4">{getDiscountDescription(product?.discount?.type)}</p>
            </div>
              <div className="w-full max-w-[200px] pl-4 ">
                <p>{product?.discount?.startDate && new Date(product?.discount?.startDate).toLocaleDateString()}</p>
                <p className="block min-[400px]:hidden">{product?.discount?.endDate && new Date(product?.discount?.endDate).toLocaleDateString()}</p>
              </div>
              <div className="w-full max-w-[200px] pl-2">
                <p className="hidden min-[400px]:block ">{product?.discount?.endDate && new Date(product?.discount?.endDate).toLocaleDateString()}</p>
              </div>
              <Switch checked={product?.discount?.status }
                onCheckedChange={(checked) => onStatusChange(product.id, checked)}  className='mr-4' />
             
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