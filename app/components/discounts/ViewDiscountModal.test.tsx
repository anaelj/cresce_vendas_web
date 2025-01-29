import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ViewDiscountModal } from './ViewDiscountModal';
import '@testing-library/jest-dom';
import { Product } from '@/app/types/discount';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/lib/formatters', () => ({
  formatDiscount: jest.fn((discount) => `${discount}%`),
  formatPrice: jest.fn((price) => `R$ ${price.toFixed(2)}`),
}));

describe('ViewDiscountModal', () => {
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
    id: '1',
    image: 'image-url'
  };

  const onClose = jest.fn();

  it('deve renderizar o modal com os detalhes do desconto', () => {
    render(<ViewDiscountModal product={mockProduct} onClose={onClose} />);

    expect(screen.getByText('Detalhes do desconto')).toBeInTheDocument();
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('20% OFF')).toBeInTheDocument();
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
    expect(screen.getByText('R$ 80.00')).toBeInTheDocument();
  });

  it('deve chamar a função onClose ao clicar no botão Fechar', () => {
    render(<ViewDiscountModal product={mockProduct} onClose={onClose} />);

    const closeButton = screen.getByText('Fechar');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });


});
