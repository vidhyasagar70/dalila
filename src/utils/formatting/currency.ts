export const formatCurrency = (
  value: string | number,
  options?: Intl.NumberFormatOptions
): string => {
  const num = parseFloat(String(value));
  if (isNaN(num)) return "N/A";
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(num);
};

export const formatPrice = (value: string | number): string => {
  const num = parseFloat(String(value));
  return isNaN(num)
    ? "N/A"
    : `$${num.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
};


