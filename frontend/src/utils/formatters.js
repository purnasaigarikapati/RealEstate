// Indian Rupee (INR) Currency and Number Formatter Utility

export const formatINR = (amount, compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Number(amount);

  if (compact) {
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
      return `₹${cr} Cr`;
    }
    if (num >= 100000) {
      const lk = (num / 100000).toFixed(2).replace(/\.00$/, '');
      return `₹${lk} Lakh`;
    }
    if (num >= 1000) {
      const k = (num / 1000).toFixed(1).replace(/\.0$/, '');
      return `₹${k} K`;
    }
    return `₹${num}`;
  }

  // Full Indian currency formatting with commas (e.g. ₹1,25,00,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

export const formatPriceBadge = (amount, purpose = 'sale') => {
  const formatted = formatINR(amount, true);
  return purpose === 'rent' ? `${formatted}/mo` : formatted;
};

