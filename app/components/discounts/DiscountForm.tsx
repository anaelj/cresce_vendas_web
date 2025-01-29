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
import { useCompany } from '@/app/context/CompanyContext';

interface DiscountFormProps {
  initialData?: Product;
  onSubmit: () => void;
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
  const { companyName } = useCompany()

  const handleSubmit = async (form : FormData) => {
    if (!imageUrl) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      alert('A data de início não pode ser maior que a data de término.');
      return;
    }

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
        percentageDiscount: parseFloat(data?.percentageDiscount?.toString() || '0'),
        toPrice: parseFloat(data?.toPrice?.toString() || '0'),
        buyQuantity: parseFloat(data?.buyQuantity?.toString() || '0'),
        payQuantity: parseFloat(data?.payQuantity?.toString() || '0'),
      }
    };

    initialData?.id ? await actionUpdateDiscount(newData) : await actionSubmitDiscount(newData);
    onSubmit();
  };

  return (
    <form method='POST' action={handleSubmit} className="mx-2 sm:mx-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center mb-6 md:mt-20">
          <div>
              <h1 className="text-[32px] font-medium text-font-light">{initialData ? 'Editar desconto' : 'Cadastrar desconto'}</h1>
              <h2 className="text-[14px] text-font-light">{companyName} </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 bg-white rounded-t-lg text-font-medium font-normal text-[20px]" >
        <div className='flex w-full justify-between border-b p-4'>
          <div>
              <p>Formulário cadastro desconto</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="active">Ativo</Label>
            <Switch id="active" defaultChecked={initialData?.discount?.status || !initialData} name='status' />
          </div>
        </div>
        <div className='pl-4 pr-4 gap-4'>
          <div className='gap-2 flex flex-col mt-2'>
            <Label htmlFor="title">Nome do desconto</Label>
            <Input 
              id="title" 
              name="title" 
              defaultValue={initialData?.title} 
            />
          </div>

        <div className='gap-2 flex flex-col mt-4'>
          <Label htmlFor="description">Descrição do desconto</Label>
          <Input id="description" name="description" defaultValue={initialData?.description} />
        </div>

        <div className='gap-2 flex flex-col mt-4'>
          <Label htmlFor="type">Tipo de Desconto</Label>
          <Select
            value={discountType}
            onValueChange={(value) => setDiscountType(value as DiscountType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy-more-pay-less">Leve + Pague -</SelectItem>
              <SelectItem value="percentage">Percentual</SelectItem>
              <SelectItem value="from-to">DE / POR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {discountType === 'from-to' && (
          <div className="grid grid-cols-2 gap-4">
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="fromPrice">Preço "DE"</Label>
              <Input
                id="fromPrice"
                type="text"
                name='fromPrice'
                defaultValue={initialData?.discount?.fromPrice}
              />
            </div>
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="toPrice">Preço "POR"</Label>
              <Input
                id="toPrice"
                name="toPrice"
                type="text"
                defaultValue={initialData?.discount?.toPrice}
              />
            </div>
          </div>
        )}

        {discountType === 'buy-more-pay-less' && (
          <div className="grid grid-cols-3 gap-4">
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                name="price"
                type="text"
                defaultValue={initialData?.price}
              />
            </div>
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="buyQuantity">Leve</Label>
              <Input
                id="buyQuantity"
                name="buyQuantity"
                type="number"
                defaultValue={initialData?.discount?.buyQuantity}
              />
            </div>
            <div className='gap-2 flex flex-col mt-4'>
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
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                name="price"
                type="text"
                defaultValue={initialData?.price}
              />
            </div>
            <div className='gap-2 flex flex-col mt-4'>
              <Label htmlFor="percentageDiscount">Percentual</Label>
              <Input
                id="percentageDiscount"
                name="percentageDiscount"
                type="text"
                defaultValue={initialData?.discount?.percentageDiscount}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className='gap-2 flex flex-col mt-4'>
             <DatePicker
                date={startDate}
                setDate={setStartDate}
                label='Data da ativação'
             />
          </div>
          <div className='gap-2 flex flex-col mt-4'>
             <DatePicker
                date={endDate}
                setDate={setEndDate}
                label='Data da inativação'
             />
          </div>
        </div>
        <div className='gap-2 flex flex-col mt-12'>
            <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl}  />
        </div>
        <div className='flex mt-12 justify-end pb-8' >
          <Button type="submit" className="bg-background_sidebar w-[200px] h-[40px]">
              Salvar
          </Button>
        </div>
        </div>
      </div>
    </form>
  );
}
