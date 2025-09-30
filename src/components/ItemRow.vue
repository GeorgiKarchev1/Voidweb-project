<template>
  <tr class="border-b border-gray-100 last:border-0">
    <td class="px-4 py-4">
      <textarea
        :value="item.description"
        @input="updateItem('description', ($event.target as HTMLTextAreaElement).value)"
        placeholder="Item description..."
        rows="1"
        class="block w-full min-w-[200px] resize-none border-0 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 rounded-lg bg-gray-50"
        :class="{ 'bg-red-50 ring-2 ring-red-200': errors.description }"
      />
      <p v-if="errors.description" class="mt-1 text-xs text-red-600 font-medium">{{ errors.description }}</p>
    </td>
    <td class="px-4 py-4">
      <input
        :value="item.quantity"
        @input="updateItem('quantity', Number(($event.target as HTMLInputElement).value))"
        type="number"
        min="1"
        step="1"
        placeholder="1"
        class="block w-20 border-0 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 rounded-lg bg-gray-50 text-center"
        :class="{ 'bg-red-50 ring-2 ring-red-200': errors.quantity }"
      />
      <p v-if="errors.quantity" class="mt-1 text-xs text-red-600 font-medium">{{ errors.quantity }}</p>
    </td>
    <td class="px-4 py-4">
      <input
        :value="item.unitPrice"
        @input="updateItem('unitPrice', Number(($event.target as HTMLInputElement).value))"
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        class="block w-28 border-0 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 rounded-lg bg-gray-50"
        :class="{ 'bg-red-50 ring-2 ring-red-200': errors.unitPrice }"
      />
      <p v-if="errors.unitPrice" class="mt-1 text-xs text-red-600 font-medium">{{ errors.unitPrice }}</p>
    </td>
    <td class="px-4 py-4 text-base text-gray-900 font-semibold">
      {{ formatCurrency(calculatedTotal) }}
    </td>
    <td class="px-4 py-4">
      <button
        @click="$emit('remove')"
        :disabled="!canRemove"
        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        title="Remove item"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceItem } from '@/types/invoice'
import { formatCurrency } from '@/utils/currency'
import { validateInvoiceItem } from '@/utils/validators'

interface Props {
  item: InvoiceItem
  canRemove: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [field: keyof InvoiceItem, value: any]
  remove: []
}>()

const calculatedTotal = computed(() => {
  const qty = props.item.quantity || 0
  const price = props.item.unitPrice || 0
  return qty * price
})

const errors = computed(() => {
  const validationErrors = validateInvoiceItem(props.item)
  return validationErrors.reduce((acc, error) => {
    acc[error.field as keyof InvoiceItem] = error.message
    return acc
  }, {} as Record<keyof InvoiceItem, string>)
})

function updateItem(field: keyof InvoiceItem, value: any) {
  emit('update', field, value)
}
</script>