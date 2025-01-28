

  export const getDiscountDescription = (type : string = '') => {
    switch (type) {
      case 'from-to': return 'De / Por';
      case 'percentage': return 'Percentual';
      case 'buy-more-pay-less': return 'Leve + Pague -';
      default: return '';
    }
  };