<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-12 flex flex-col">
    <!-- Header -->
    <div class="w-full max-w-[2000px] mx-auto mb-12 animate-fade-in">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
          <h1 class="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">Invoices</h1>
          <p class="text-xl text-gray-600 font-medium leading-relaxed">Manage and track all your invoices in one place.</p>
        </div>
        <div class="mt-6 sm:mt-0 sm:ml-16 sm:flex-none">
          <RouterLink
            to="/invoices/new"
            class="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gray-900 px-7 py-4 text-base font-bold text-white shadow-strong hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-300 ease-out"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Invoice
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="w-full max-w-[2000px] mx-auto mb-10">
      <div class="relative max-w-2xl">
        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          @input="debouncedSearch(($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search by customer name..."
          class="block w-full pl-14 pr-5 py-4 text-base rounded-2xl border-2 border-gray-200/80 bg-white shadow-medium focus:shadow-strong focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder:text-gray-400"
        />
      </div>
    </div>

    <!-- Error Banner -->
    <div v-if="error" class="w-full max-w-[2000px] mx-auto mb-8">
      <div class="rounded-2xl bg-red-50 p-6 shadow-soft border border-red-100">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-base font-semibold text-red-900">Error loading invoices</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
            <div class="mt-4">
              <button
                @click="loadInvoices"
                class="rounded-xl bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="w-full max-w-[2000px] mx-auto">
      <div class="bg-white rounded-3xl shadow-strong overflow-hidden border-2 border-gray-100">

        <!-- Loading State -->
        <div v-if="loading" class="px-8 py-12">
          <LoadingSkeleton :rows="5" />
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredInvoices.length === 0 && !error">
          <EmptyState
            title="No invoices"
            description="Get started by creating a new invoice."
          >
            <template #action>
              <RouterLink
                to="/invoices/new"
                class="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gray-900 text-white shadow-soft hover:bg-gray-800 hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                New Invoice
              </RouterLink>
            </template>
          </EmptyState>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full" style="min-width: 1600px;">
            <thead>
              <tr class="border-b-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Number</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Customer</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Date</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Due Date</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Subtotal</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">VAT</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Total</th>
                <th class="px-8 py-5 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">Status</th>
                <th class="px-8 py-5 text-center text-xs font-extrabold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="invoice in filteredInvoices"
                :key="invoice.id"
                class="group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-purple-50/30 hover:to-transparent border-b border-gray-100 hover:border-transparent hover:shadow-[inset_0_1px_0_0_rgba(59,130,246,0.1),inset_0_-1px_0_0_rgba(59,130,246,0.1)]"
              >
                <td class="px-8 py-6 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-sm font-extrabold text-gray-900">{{ invoice.number }}</span>
                  </div>
                </td>
                <td class="px-8 py-6 whitespace-nowrap">
                  <div class="text-sm font-bold text-gray-900">{{ invoice.customerName }}</div>
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-600">
                  {{ formatDate(invoice.date) }}
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-600">
                  {{ formatDate(invoice.dueDate) }}
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900">
                  {{ formatCurrency(invoice.subtotal) }}
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-600">
                  {{ formatCurrency(invoice.vat) }}
                </td>
                <td class="px-8 py-6 whitespace-nowrap">
                  <span class="text-lg font-extrabold text-gray-900">{{ formatCurrency(invoice.total) }}</span>
                </td>
                <td class="px-8 py-6 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-4 py-2 text-xs font-bold rounded-full ring-1 ring-inset"
                    :class="{
                      'bg-emerald-50 text-emerald-700 ring-emerald-600/20': invoice.status === 'paid',
                      'bg-amber-50 text-amber-700 ring-amber-600/20': invoice.status === 'unpaid',
                      'bg-gray-100 text-gray-700 ring-gray-600/20': invoice.status === 'draft'
                    }"
                  >
                    {{ invoice.status }}
                  </span>
                </td>
                <td class="px-8 py-6 whitespace-nowrap text-right">
                  <div class="flex items-center justify-end gap-3">
                    <RouterLink
                      :to="`/invoices/${invoice.id}`"
                      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-gray-50 hover:bg-white hover:shadow-medium hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
                      title="Edit invoice"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </RouterLink>
                    <button
                      @click="deleteInvoice(invoice)"
                      :disabled="deletingIds.has(invoice.id!)"
                      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 hover:shadow-medium hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 border border-red-200"
                      title="Delete invoice"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span v-if="deletingIds.has(invoice.id!)">Deleting...</span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

    <!-- Confirm Modal -->
    <ConfirmModal
      :show="confirmModal.show"
      :title="confirmModal.title"
      :message="confirmModal.message"
      confirm-text="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchInvoices, deleteInvoice as apiDeleteInvoice } from '@/api/invoices'
import { formatCurrency } from '@/utils/currency'
import { formatDate } from '@/utils/format'
import { debounce } from '@/utils/validators'
import type { Invoice } from '@/types/invoice'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import EmptyState from '@/components/EmptyState.vue'
import Toast from '@/components/Toast.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const invoices = ref<Invoice[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const deletingIds = ref(new Set<string>())
const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})
const confirmModal = ref({
  show: false,
  title: '',
  message: '',
  invoiceToDelete: null as Invoice | null
})

const filteredInvoices = computed(() => {
  if (!searchQuery.value.trim()) {
    return invoices.value
  }
  const query = searchQuery.value.toLowerCase().trim()
  return invoices.value.filter(invoice =>
    invoice.customerName.toLowerCase().includes(query)
  )
})

const debouncedSearch = debounce((query: string) => {
  searchQuery.value = query
}, 350)

async function loadInvoices() {
  loading.value = true
  error.value = null
  try {
    invoices.value = await fetchInvoices()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load invoices'
  } finally {
    loading.value = false
  }
}

function deleteInvoice(invoice: Invoice) {
  if (!invoice.id) return

  confirmModal.value = {
    show: true,
    title: 'Delete Invoice',
    message: `Are you sure you want to delete invoice ${invoice.number}? This action cannot be undone.`,
    invoiceToDelete: invoice
  }
}

async function confirmDelete() {
  const invoice = confirmModal.value.invoiceToDelete
  if (!invoice?.id) return

  confirmModal.value.show = false
  deletingIds.value.add(invoice.id)

  try {
    await apiDeleteInvoice(invoice.id)
    invoices.value = invoices.value.filter(i => i.id !== invoice.id)
    showToast('Invoice deleted successfully', 'success')
  } catch (err) {
    showToast(err instanceof Error ? err.message : 'Failed to delete invoice', 'error')
  } finally {
    deletingIds.value.delete(invoice.id)
    confirmModal.value.invoiceToDelete = null
  }
}

function cancelDelete() {
  confirmModal.value.show = false
  confirmModal.value.invoiceToDelete = null
}

function showToast(message: string, type: 'success' | 'error') {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 5000)
}

onMounted(() => {
  loadInvoices()
})
</script>