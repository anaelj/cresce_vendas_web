import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import ByMorePayLessDiscount from './byMorePayLess';
import '@testing-library/jest-dom';
import { Product } from '@/app/types/discount';

jest.mock('../../../../lib/formatters', () => ({
  formatPrice: jest.fn((price) => `R$ ${price.toFixed(2)}`),
}));

describe('ByMorePayLessDiscount', () => {
  const mockProduct: Product = {
    title: 'Produto Teste',
    description: 'Descrição do Produto Teste',
    discount: {
      buyQuantity: 3,
      payQuantity: 2,
      type: 'buy-more-pay-less',
      status: false,
      startDate: '',
      endDate: '',
      order: 0
    },
    price: 100,
    id: '',
    image: ''
  };

  it('deve renderizar o componente com a promoção formatada', () => {
    render(<ByMorePayLessDiscount product={mockProduct} />);

    expect(screen.getByText('Leve 3 Pague 2')).toBeInTheDocument();
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
  });

  it('não deve renderizar o componente se buyQuantity ou payQuantity não estiverem presentes', () => {
    const productWithoutDiscount: Product = {
      title: 'Produto Sem Desconto',
      description: 'Descrição do Produto Sem Desconto',
      discount: {
        buyQuantity: undefined,
        payQuantity: undefined,
        type: 'buy-more-pay-less',
        status: false,
        startDate: '',
        endDate: '',
        order: 0
      },
      price: 100,
      id: '',
      image: ''
    };

    render(<ByMorePayLessDiscount product={productWithoutDiscount} />);

    // Verifica se o componente não renderiza nada
    expect(screen.queryByText('Produto Sem Desconto')).not.toBeInTheDocument();
    expect(screen.queryByText('Descrição do Produto Sem Desconto')).not.toBeInTheDocument();
  });
});
