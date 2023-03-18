export const currencyFormatter = (value: string | number) => {
  if (Number(value)) {
    const format = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(value));
    return format;
  } else {
    return value;
  }
};
