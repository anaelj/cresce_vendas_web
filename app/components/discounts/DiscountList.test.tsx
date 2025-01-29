import React from 'react';
import { Product } from '@/app/types/discount';
import { DiscountList } from './DiscountList';
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectValue: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('@/components/ui/switch', () => ({
  Switch: ({ checked, onCheckedChange }: any) => (
    <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
  ),
}));

jest.mock('lucide-react', () => ({
  GripVertical: () => <div>GripVertical</div>,
}));

jest.mock('next/link', () => ({ children }: any) => children);

jest.mock('@/app/context/CompanyContext', () => ({
  useCompany: () => ({
    companyName: 'Test Company',
  }),
}));

jest.mock('@/lib/discount', () => ({
  getDiscountDescription: (type: string) => type,
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    image: '/path/to/image1.jpg',
    discount: {
      type: 'percentage',
      status: true,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      order: 0
    },
    description: ''
  },
  {
    id: '2',
    title: 'Product 2',
    image: '/path/to/image2.jpg',
    discount: {
      type: 'buy-more-pay-less',
      status: false,
      startDate: '2023-02-01',
      endDate: '2023-11-30',
      order: 0
    },
    description: ''
  },
];

describe('DiscountList', () => {
  it('renders the list of products', () => {
    const onStatusChange = jest.fn();
    render(<DiscountList products={mockProducts} onStatusChange={onStatusChange} />);

    expect(screen.getByText('Lista de descontos')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calls onStatusChange when switch is toggled', () => {
    const onStatusChange = jest.fn();
    render(<DiscountList products={mockProducts} onStatusChange={onStatusChange} />);

    const switchElement = screen.getAllByRole('checkbox')[0];
    fireEvent.click(switchElement);

    expect(onStatusChange).toHaveBeenCalledWith('1', false);
  });


});