import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DiscountFromTo from './fromTo';
import '@testing-library/jest-dom';
import { Product } from '@/app/types/discount';


jest.mock('../../../../lib/formatters', () => ({
  formatPrice: jest.fn((price) => `R$ ${price.toFixed(2)}`),
}));

describe('DiscountFromTo', () => {
  const mockProduct: Product = {
    title: 'Produto Teste',
    description: 'Descrição do Produto Teste',
    discount: {
      fromPrice: 100,
      toPrice: 80,
      type: 'buy-more-pay-less',
      status: false,
      startDate: '',
      endDate: '',
      order: 0
    },
    id: '',
    image: ''
  };

  it('deve renderizar o componente com os preços formatados', () => {
    render(<DiscountFromTo product={mockProduct} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Produto Teste')).toBeInTheDocument();

    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
    expect(screen.getByText('R$ 80.00')).toBeInTheDocument();
  });

  it('não deve renderizar o componente se fromPrice ou toPrice não estiverem presentes', () => {
    const productWithoutDiscount: Product = {
      title: 'Produto Sem Desconto',
      description: 'Descrição do Produto Sem Desconto',
      discount: {
        fromPrice: undefined,
        toPrice: undefined,
        type: 'buy-more-pay-less',
        status: false,
        startDate: '',
        endDate: '',
        order: 0
      },
      id: '',
      image: ''
    };

    render(<DiscountFromTo product={productWithoutDiscount} />);

    // Verifica se o componente não renderiza nada
    expect(screen.queryByText('Produto Sem Desconto')).not.toBeInTheDocument();
    expect(screen.queryByText('Descrição do Produto Sem Desconto')).not.toBeInTheDocument();
  });
});
