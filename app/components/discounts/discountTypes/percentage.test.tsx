import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DiscountPercentage from './percentage';
import '@testing-library/jest-dom';
import { Product } from '@/app/types/discount';

jest.mock('../../../../lib/formatters', () => ({
  formatDiscount: jest.fn((discount) => `${discount}%`),
  formatPrice: jest.fn((price) => `R$ ${price.toFixed(2)}`),
}));

describe('DiscountPercentage', () => {
  const mockProduct: Product = {
    title: 'Produto Teste',
    description: 'Descrição do Produto Teste',
    discount: {
      percentageDiscount: 20,
      fromPrice: 100,
      toPrice: 80,
      type: 'percentage',
      status: false,
      startDate: '',
      endDate: '',
      order: 0
    },
    price: 100,
    id: '',
    image: ''
  };

  it('deve renderizar o componente com o desconto formatado', () => {
    render(<DiscountPercentage product={mockProduct} />);

    expect(screen.getByText('20% OFF')).toBeInTheDocument();
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
    expect(screen.getByText('R$ 80.00')).toBeInTheDocument();
  });

  it('não deve renderizar o componente se percentageDiscount ou price não estiverem presentes', () => {
    const productWithoutDiscount: Product = {
      title: 'Produto Sem Desconto',
      description: 'Descrição do Produto Sem Desconto',
      discount: {
        percentageDiscount: undefined,
        fromPrice: 100,
        toPrice: 80,
        type: 'percentage',
        status: false,
        startDate: '',
        endDate: '',
        order: 0
      },
      price: undefined,
      id: '',
      image: ''
    };

    render(<DiscountPercentage product={productWithoutDiscount} />);

    // Verifica se o componente não renderiza nada
    expect(screen.queryByText('Produto Sem Desconto')).not.toBeInTheDocument();
    expect(screen.queryByText('Descrição do Produto Sem Desconto')).not.toBeInTheDocument();
  });
});
