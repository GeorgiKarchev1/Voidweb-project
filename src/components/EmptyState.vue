<template>
  <div class="text-center py-24">
    <div class="mx-auto max-w-lg">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 mb-8 shadow-soft">
        <svg class="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ title }}</h3>
      <p class="text-base text-gray-600 mb-8">{{ description }}</p>
      <div v-if="$slots.action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>