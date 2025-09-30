import { apiRequest } from './client'
import type { Invoice } from '@/types/invoice'

export async function fetchInvoices(): Promise<Invoice[]> {
  return apiRequest<Invoice[]>('')
}

export async function fetchInvoice(id: string): Promise<Invoice> {
  return apiRequest<Invoice>(`/${id}`)
}

export async function createInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
  return apiRequest<Invoice>('', {
    method: 'POST',
    body: JSON.stringify(invoice),
  })
}

export async function updateInvoice(id: string, invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
  return apiRequest<Invoice>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(invoice),
  })
}

export async function deleteInvoice(id: string): Promise<void> {
  await apiRequest(`/${id}`, {
    method: 'DELETE',
  })
}