<template>
  <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <div class="px-6 py-8">
      <!-- Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <div class="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">ACME Studio</h2>
          <div class="text-sm text-gray-500 mt-1">
            <p>Sofia, Bulgaria</p>
            <p>VAT: BG123456789</p>
            <p>contact@acme.studio</p>
          </div>
        </div>
        <div class="text-right">
          <h1 class="text-3xl font-bold text-gray-900">INVOICE</h1>
          <p class="text-lg font-medium text-gray-600 mt-1">{{ invoice.number || 'INV-####' }}</p>
        </div>
      </div>

      <!-- Invoice Info -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">Bill To:</h3>
          <div class="text-sm text-gray-600">
            <p class="font-medium">{{ invoice.customerName || 'Customer Name' }}</p>
            <p v-if="invoice.customerEmail">{{ invoice.customerEmail }}</p>
            <p v-else-if="!invoice.customerName" class="text-gray-400">No customer selected</p>
          </div>
        </div>
        <div class="text-right">
          <dl class="space-y-1">
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">Date:</dt>
              <dd class="text-sm font-medium text-gray-900">{{ invoice.date ? formatDate(invoice.date) : '—' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">Due Date:</dt>
              <dd class="text-sm font-medium text-gray-900">{{ invoice.dueDate ? formatDate(invoice.dueDate) : '—' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">Status:</dt>
              <dd>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': invoice.status === 'paid',
                    'bg-yellow-100 text-yellow-800': invoice.status === 'unpaid',
                    'bg-gray-100 text-gray-800': invoice.status === 'draft'
                  }"
                >
                  {{ invoice.status || 'draft' }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Items Table -->
      <div class="mb-8">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
              <th class="px-0 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in invoice.items" :key="index">
              <td class="px-0 py-3 text-sm text-gray-900">{{ item.description || 'Item description' }}</td>
              <td class="px-3 py-3 text-sm text-gray-900 text-right">{{ item.quantity || 0 }}</td>
              <td class="px-3 py-3 text-sm text-gray-900 text-right">{{ formatCurrency(item.unitPrice || 0) }}</td>
              <td class="px-0 py-3 text-sm font-medium text-gray-900 text-right">{{ formatCurrency(calculateItemTotal(item)) }}</td>
            </tr>
            <tr v-if="!invoice.items?.length">
              <td colspan="4" class="px-0 py-3 text-sm text-gray-400 text-center">No items added</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="flex justify-end">
        <div class="w-64">
          <dl class="space-y-2">
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">Subtotal:</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatCurrency(subtotal) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">VAT (20%):</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatCurrency(vat) }}</dd>
            </div>
            <div class="flex justify-between border-t border-gray-200 pt-2">
              <dt class="text-base font-medium text-gray-900">Total:</dt>
              <dd class="text-base font-bold text-gray-900">{{ formatCurrency(total) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-xs text-gray-500 text-center">
          Thank you for your business! Payment is due within {{ paymentTerms }} days.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Invoice } from '@/types/invoice'
import { formatCurrency } from '@/utils/currency'
import { formatDate } from '@/utils/format'

interface Props {
  invoice: Partial<Invoice>
  subtotal: number
  vat: number
  total: number
}

const props = defineProps<Props>()

function calculateItemTotal(item: any) {
  const qty = item?.quantity || 0
  const price = item?.unitPrice || 0
  return qty * price
}

const paymentTerms = computed(() => {
  if (!props.invoice.date || !props.invoice.dueDate) return 30
  const date = new Date(props.invoice.date)
  const dueDate = new Date(props.invoice.dueDate)
  const diffTime = dueDate.getTime() - date.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(diffDays, 0)
})
</script>