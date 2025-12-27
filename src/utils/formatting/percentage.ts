export const formatPercentage = (
  value: string | number,
  decimals: number = 2
): string => {
  const num = parseFloat(String(value));
  if (isNaN(num)) return "N/A";
  
  return `${num.toFixed(decimals)}%`;
};


