<template>
  <div class="min-h-full">
    <!-- Loading State -->
    <div v-if="loading" class="px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="h-10 bg-gray-200 rounded"></div>
            <div class="h-10 bg-gray-200 rounded"></div>
            <div class="h-32 bg-gray-200 rounded"></div>
          </div>
          <div class="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError" class="px-4 sm:px-6 lg:px-8">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading invoice</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ loadError }}</p>
            </div>
            <div class="mt-4">
              <RouterLink
                to="/"
                class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                Back to List
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div v-else class="min-h-screen py-8 px-4 sm:px-6 lg:px-12">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-12">
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-3">
            <li>
              <RouterLink to="/" class="text-gray-500 hover:text-primary-600 hover:scale-110 transition-all">
                <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span class="sr-only">Home</span>
              </RouterLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="ml-3 text-sm font-semibold text-gray-600">
                  {{ isEditing ? 'Edit Invoice' : 'New Invoice' }}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
          {{ isEditing ? `Edit Invoice ${invoice.number}` : 'Create New Invoice' }}
        </h1>
      </div>

      <!-- Two Column Layout -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Form Column -->
          <div class="space-y-8">
            <!-- Basic Info -->
            <div class="bg-white/95 backdrop-blur-sm shadow-medium rounded-3xl border border-gray-100/80 transition-all duration-200 hover:shadow-strong">
              <div class="px-8 py-8">
                <h2 class="text-xl font-bold text-gray-900 mb-6 tracking-tight">Invoice Details</h2>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="number" class="block text-sm font-semibold text-gray-800 mb-2">
                    Invoice Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="number"
                    v-model="invoice.number"
                    type="text"
                    required
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                    :class="{ 'ring-red-500': errors.number }"
                  />
                  <p v-if="errors.number" class="mt-2 text-xs text-red-600 font-medium">{{ errors.number }}</p>
                </div>

                <div>
                  <label for="status" class="block text-sm font-semibold text-gray-800 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    v-model="invoice.status"
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                    :class="{ 'ring-red-500': errors.status }"
                  >
                    <option value="">Select status</option>
                    <option value="draft">Draft</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                  <p v-if="errors.status" class="mt-2 text-xs text-red-600 font-medium">{{ errors.status }}</p>
                </div>

                <div>
                  <label for="date" class="block text-sm font-semibold text-gray-800 mb-2">
                    Date <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    v-model="invoice.date"
                    type="date"
                    required
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                    :class="{ 'ring-red-500': errors.date }"
                  />
                  <p v-if="errors.date" class="mt-2 text-xs text-red-600 font-medium">{{ errors.date }}</p>
                </div>

                <div>
                  <label for="due-date" class="block text-sm font-semibold text-gray-800 mb-2">
                    Due Date <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="due-date"
                    v-model="invoice.dueDate"
                    type="date"
                    required
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                    :class="{ 'ring-red-500': errors.dueDate }"
                  />
                  <p v-if="errors.dueDate" class="mt-2 text-xs text-red-600 font-medium">{{ errors.dueDate }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="bg-white/95 backdrop-blur-sm shadow-medium rounded-3xl border border-gray-100/80 transition-all duration-200 hover:shadow-strong">
            <div class="px-8 py-8">
              <h2 class="text-xl font-bold text-gray-900 mb-6 tracking-tight">Customer Details</h2>

              <div class="space-y-6">
                <div>
                  <label for="customer-name" class="block text-sm font-semibold text-gray-800 mb-2">
                    Customer Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-name"
                    v-model="invoice.customerName"
                    type="text"
                    required
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                    :class="{ 'ring-red-500': errors.customerName }"
                  />
                  <p v-if="errors.customerName" class="mt-2 text-xs text-red-600 font-medium">{{ errors.customerName }}</p>
                </div>

                <div>
                  <label for="customer-email" class="block text-sm font-semibold text-gray-800 mb-2">
                    Customer Email
                  </label>
                  <input
                    id="customer-email"
                    v-model="invoice.customerEmail"
                    type="email"
                    class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/50 focus:shadow-medium sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Items -->
          <div class="bg-white/95 backdrop-blur-sm shadow-medium rounded-3xl border border-gray-100/80 transition-all duration-200 hover:shadow-strong">
            <div class="px-8 py-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-900 tracking-tight">Items</h2>
                <button
                  @click="addItem"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-gray-800 hover:shadow-medium hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all duration-200"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </button>
              </div>

              <div v-if="errors.items" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl shadow-soft">
                <p class="text-sm text-red-700 font-medium">{{ errors.items }}</p>
              </div>

              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr class="divide-x divide-gray-200">
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <ItemRow
                      v-for="(item, index) in invoice.items"
                      :key="index"
                      :item="item"
                      :can-remove="invoice.items.length > 1"
                      @update="(field, value) => updateItem(index, field, value)"
                      @remove="removeItem(index)"
                    />
                    <tr v-if="!invoice.items.length">
                      <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-500">
                        No items added. Click "Add Item" to get started.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-x-6 pt-4">
            <RouterLink
              to="/"
              class="text-sm font-semibold text-gray-700 hover:text-gray-900 hover:scale-105 transition-all duration-200"
            >
              Cancel
            </RouterLink>
            <button
              @click="saveInvoice"
              :disabled="saving || !isFormValid"
              type="button"
              class="rounded-xl bg-gray-900 px-8 py-3.5 text-base font-bold text-white shadow-medium hover:bg-gray-800 hover:shadow-strong hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span v-if="saving" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>{{ isEditing ? 'Update' : 'Create' }} Invoice</span>
            </button>
          </div>
        </div>

        <!-- Preview Column -->
        <div class="lg:sticky lg:top-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Live Preview</h2>
            <p class="text-sm text-gray-600 font-medium mt-1">See how your invoice looks in real-time</p>
          </div>
          <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-strong border border-gray-100/80 overflow-hidden">
            <InvoicePreview
              :invoice="invoice"
              :subtotal="totals.subtotal"
              :vat="totals.vat"
              :total="totals.total"
            />
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Toast -->
    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchInvoice, createInvoice, updateInvoice } from '@/api/invoices'
import { recalculateInvoiceTotals } from '@/utils/calculations'
import { validateInvoice } from '@/utils/validators'
import { getCurrentDate } from '@/utils/format'
import type { Invoice, InvoiceItem, InvoiceStatus } from '@/types/invoice'
import ItemRow from '@/components/ItemRow.vue'
import InvoicePreview from '@/components/InvoicePreview.vue'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const router = useRouter()

const invoice = ref<Partial<Invoice>>({
  number: '',
  date: getCurrentDate(),
  dueDate: '',
  customerName: '',
  customerEmail: '',
  items: [
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ],
  subtotal: 0,
  vat: 0,
  total: 0,
  status: 'draft' as InvoiceStatus
})

const loading = ref(false)
const loadError = ref<string | null>(null)
const saving = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

const isEditing = computed(() => !!route.params.id && route.params.id !== 'new')

const errors = computed(() => {
  const validationErrors = validateInvoice(invoice.value)
  return validationErrors.reduce((acc, error) => {
    acc[error.field] = error.message
    return acc
  }, {} as Record<string, string>)
})

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0
})

const totals = computed(() => {
  if (!invoice.value.items) return { subtotal: 0, vat: 0, total: 0 }
  return recalculateInvoiceTotals(invoice.value.items)
})

watch(() => invoice.value.items, () => {
  const calculated = recalculateInvoiceTotals(invoice.value.items || [])
  invoice.value.subtotal = calculated.subtotal
  invoice.value.vat = calculated.vat
  invoice.value.total = calculated.total
}, { deep: true })

function addItem() {
  if (!invoice.value.items) invoice.value.items = []
  invoice.value.items.push({
    description: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  })
}

function removeItem(index: number) {
  if (invoice.value.items && invoice.value.items.length > 1) {
    invoice.value.items.splice(index, 1)
  }
}

function updateItem(index: number, field: keyof InvoiceItem, value: any) {
  if (invoice.value.items && invoice.value.items[index]) {
    invoice.value.items[index][field] = value
  }
}

async function loadInvoice() {
  const id = route.params.id as string
  if (!id || id === 'new') return

  loading.value = true
  loadError.value = null

  try {
    const data = await fetchInvoice(id)
    invoice.value = { ...data }
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Failed to load invoice'
  } finally {
    loading.value = false
  }
}

async function saveInvoice() {
  if (!isFormValid.value) {
    showToast('Please fix validation errors before saving', 'error')
    return
  }

  saving.value = true

  try {
    const invoiceData = {
      ...invoice.value,
      subtotal: totals.value.subtotal,
      vat: totals.value.vat,
      total: totals.value.total
    } as Omit<Invoice, 'id'>

    if (isEditing.value) {
      await updateInvoice(route.params.id as string, invoiceData)
      showToast('Invoice updated successfully', 'success')
    } else {
      await createInvoice(invoiceData)
      showToast('Invoice created successfully', 'success')
    }

    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (err) {
    showToast(err instanceof Error ? err.message : 'Failed to save invoice', 'error')
  } finally {
    saving.value = false
  }
}

function showToast(message: string, type: 'success' | 'error') {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 5000)
}

onMounted(() => {
  loadInvoice()
})
</script>