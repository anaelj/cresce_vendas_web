export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export const formatDiscount = (discount: number | string) => {
  return `${Number(discount).toFixed(0).replace('.', ',')}%`;
};
