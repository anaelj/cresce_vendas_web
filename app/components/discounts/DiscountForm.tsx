import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DiscountType, Product } from '@/app/types/discount';
import { actionSubmitDiscount} from '@/app/actions/submitDiscount';
import DatePicker from '@/components/ui/calendar';
import { actionUpdateDiscount } from '@/app/actions/updateDiscount';
import ImageUpload from '@/components/ui/imageUpload';

interface DiscountFormProps {
  initialData?: Product;
  onSubmit:  () => void;
}

export function DiscountForm({ initialData, onSubmit  }: DiscountFormProps) {
  const [discountType, setDiscountType] = useState<DiscountType>(initialData?.discount?.type || 'percentage');
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialData?.discount?.startDate ? new Date(initialData?.discount?.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialData?.discount?.endDate ? new Date(initialData?.discount?.endDate) : undefined
  );
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.image || null);
  
  const handleSubmit = async (form : FormData) => {
    const data = Object.fromEntries(form.entries());

    const newData = {
      id: initialData?.id ,
      image: imageUrl,
      title: data.title,
      description: data.description,
      price: parseFloat(data?.price?.toString() || '0'),
      discount: {
        status: data?.status === 'on' ,
        type: discountType,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        fromPrice: parseFloat(data?.fromPrice?.toString() || '0'),
        toPrice: parseFloat(data?.toPrice?.toString() || '0'),
        buyQuantity: parseFloat(data?.buyQuantity?.toString() || '0'),
        payQuantity: parseFloat(data?.payQuantity?.toString() || '0'),
      }
    };

    initialData?.id ? await actionUpdateDiscount(newData) : await actionSubmitDiscount(newData);
    onSubmit();
  };

  return (
    <form method='POST' action={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {initialData ? 'Editar Desconto' : 'Novo Desconto'}
        </h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="active">Ativo</Label>
          <Switch id="active" defaultChecked={initialData?.discount?.status} name='status' />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Nome</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={initialData?.title} 
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" name="description" defaultValue={initialData?.description} />
        </div>

        <div>
          <Label htmlFor="type">Tipo de Desconto</Label>
          <Select
            value={discountType}
            onValueChange={(value) => setDiscountType(value as DiscountType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy-more-pay-less">Leve + Pague-</SelectItem>
              <SelectItem value="percentage">Percentual</SelectItem>
              <SelectItem value="from-to">De Por</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {discountType === 'from-to' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromPrice">Preço DE</Label>
              <Input
                id="fromPrice"
                type="number"
                name='fromPrice'
                defaultValue={initialData?.discount?.fromPrice}
              />
            </div>
            <div>
              <Label htmlFor="toPrice">Preço POR</Label>
              <Input
                id="toPrice"
                name="toPrice"
                type="number"
                defaultValue={initialData?.discount?.toPrice}
              />
            </div>
          </div>
        )}

        {discountType === 'buy-more-pay-less' && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                name="price"
                type="text"
                defaultValue={initialData?.price}
              />
            </div>
            <div>
              <Label htmlFor="buyQuantity">Leve</Label>
              <Input
                id="buyQuantity"
                name="buyQuantity"
                type="number"
                defaultValue={initialData?.discount?.buyQuantity}
              />
            </div>
            <div>
              <Label htmlFor="payQuantity">Pague</Label>
              <Input
                id="payQuantity"
                name="payQuantity"
                type="number"
                defaultValue={initialData?.discount?.payQuantity}
              />
            </div>
          </div>
        )}

        {discountType === 'percentage' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={initialData?.price}
              />
            </div>
            <div>
              <Label htmlFor="percentageDiscount">Percentual</Label>
              <Input
                id="percentageDiscount"
                name="percentageDiscount"
                type="number"
                defaultValue={initialData?.discount?.percentageDiscount}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
                <DatePicker
                    date={startDate}
                    setDate={setStartDate}
                    label='Data da ativação'
                />
          </div>
          <div>
                <DatePicker
                    date={endDate}
                    setDate={setEndDate}
                    label='Data da inativação'
                />
          </div>
        </div>

        <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl}  />

        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </div>
    </form>
  );
}
