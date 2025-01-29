'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/app/types/discount';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DiscountPercentage from './discountTypes/percentage';
import ByMorePayLessDiscount from './discountTypes/byMorePayLess';
import DiscountFromTo from './discountTypes/fromTo';

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


  const renderPriceInfo = () => {
    switch (product?.discount?.type) {
      case 'from-to': return (<DiscountFromTo product={product} />);
      case 'percentage': return (<DiscountPercentage product={product} />);
      case 'buy-more-pay-less': return (<ByMorePayLessDiscount product={product} /> );
      default: return null;
    }
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[659px]">
        <DialogHeader>
          <DialogTitle>Detalhes do desconto</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 p-6">
        <div className="max-w-[250px] border max-h-[250px] p-2 flex justify-center rounded-[5px]">
            <img
              src={product.image}
              alt={product.title}
              className='w-auto h-auto'
            />
          </div>
          <div className="space-y-4">
              {renderPriceInfo()}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-6 p-6">
          <Button onClick={handleEdit} className="w-full bg-white text-customBlue border border-customBlue hover:border-2 hover:bg-white">
            Editar
          </Button>
          <Button variant="outline" onClick={onClose} className='w-full bg-background_sidebar text-white hover:bg-sky-500 hover:text-white'>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}