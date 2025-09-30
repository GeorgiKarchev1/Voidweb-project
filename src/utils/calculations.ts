import type { InvoiceItem } from '@/types/invoice'

export function calculateItemTotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0)
}

export function calculateVat(subtotal: number): number {
  return Math.round(subtotal * 0.20)
}

export function calculateTotal(subtotal: number, vat: number): number {
  return subtotal + vat
}

export function recalculateInvoiceTotals(items: InvoiceItem[]) {
  // Update item totals
  items.forEach(item => {
    item.total = calculateItemTotal(item.quantity, item.unitPrice)
  })

  const subtotal = calculateSubtotal(items)
  const vat = calculateVat(subtotal)
  const total = calculateTotal(subtotal, vat)

  return {
    subtotal,
    vat,
    total
  }
}