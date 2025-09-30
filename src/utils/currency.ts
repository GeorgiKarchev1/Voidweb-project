export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

export function formatCurrencySimple(amount: number): string {
  return `€${amount.toFixed(2)}`
}