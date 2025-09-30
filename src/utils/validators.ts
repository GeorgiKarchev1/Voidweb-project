import type { Invoice, InvoiceItem } from '@/types/invoice'

export interface ValidationError {
  field: string
  message: string
}

export function validateInvoiceItem(item: InvoiceItem): ValidationError[] {
  const errors: ValidationError[] = []

  if (!item.description || !item.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' })
  }

  if (!item.quantity || item.quantity <= 0) {
    errors.push({ field: 'quantity', message: 'Quantity must be greater than 0' })
  }

  if (item.unitPrice === undefined || item.unitPrice === null || item.unitPrice < 0) {
    errors.push({ field: 'unitPrice', message: 'Unit price cannot be negative' })
  }

  return errors
}

export function validateInvoice(invoice: Partial<Invoice>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!invoice.number?.trim()) {
    errors.push({ field: 'number', message: 'Invoice number is required' })
  }

  if (!invoice.date) {
    errors.push({ field: 'date', message: 'Date is required' })
  }

  if (!invoice.dueDate) {
    errors.push({ field: 'dueDate', message: 'Due date is required' })
  }

  if (!invoice.customerName?.trim()) {
    errors.push({ field: 'customerName', message: 'Customer name is required' })
  }

  if (!invoice.status) {
    errors.push({ field: 'status', message: 'Status is required' })
  }

  if (!invoice.items || invoice.items.length === 0) {
    errors.push({ field: 'items', message: 'At least one item is required' })
  } else {
    // Only validate items that have at least some data filled in
    const itemsWithData = invoice.items.filter(item =>
      item.description?.trim() || item.quantity > 0 || item.unitPrice > 0
    )

    if (itemsWithData.length === 0) {
      errors.push({ field: 'items', message: 'At least one item is required' })
    } else {
      // Validate each item with data
      const invalidItems = itemsWithData.some(item => {
        const itemErrors = validateInvoiceItem(item)
        return itemErrors.length > 0
      })

      if (invalidItems) {
        errors.push({ field: 'items', message: 'All items must be valid' })
      }
    }
  }

  return errors
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}