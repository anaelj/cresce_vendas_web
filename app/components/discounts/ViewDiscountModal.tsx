'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Discount, Product } from '@/app/types/discount';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ViewDiscountModalProps {
  product: Product;
  onClose: () => void;
}

export function ViewDiscountModal({ product, onClose }: ViewDiscountModalProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/discounts/${product.id}/edit`);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderPriceInfo = () => {
    switch (product?.discount?.type) {
      case 'from-to':
        return (
          <div className="flex gap-2">
            <span className="line-through">{formatPrice(product?.discount?.fromPrice!)}</span>
            <span className="font-bold">{formatPrice(product?.discount?.toPrice!)}</span>
          </div>
        );
      case 'percentage':
        return (
          <div>
            <span>{formatPrice(product.price!)}</span>
            <span className="ml-2 text-green-600">-{product?.discount?.percentageDiscount}%</span>
          </div>
        );
      case 'buy-more-pay-less':
        return (
          <div>
            <span>{formatPrice(product.price!)}</span>
            <span className="ml-2">Leve {product?.discount?.buyQuantity} Pague {product?.discount?.payQuantity}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-[250px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Tipo do Desconto</p>
              <p className="font-medium">{product?.discount?.type}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium">{product.title}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Descrição</p>
              <p>{product.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Preço</p>
              {renderPriceInfo()}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={handleEdit}>
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}