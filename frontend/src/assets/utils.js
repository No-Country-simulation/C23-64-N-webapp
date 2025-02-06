export const dateFormat = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

export const formatPrice = (price) => {
  const isInteger = price % 1 === 0;
  const options = isInteger
    ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
    : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  const formattedNumber = new Intl.NumberFormat('es-AR', options).format(price);
  return `$ ${formattedNumber}`;
}