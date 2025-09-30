import { createRouter, createWebHistory } from 'vue-router'
import InvoicesList from '@/views/InvoicesList.vue'
import InvoiceEditor from '@/views/InvoiceEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'invoices-list',
      component: InvoicesList
    },
    {
      path: '/invoices/new',
      name: 'new-invoice',
      component: InvoiceEditor
    },
    {
      path: '/invoices/:id',
      name: 'edit-invoice',
      component: InvoiceEditor,
      props: true
    }
  ]
})

export default router



