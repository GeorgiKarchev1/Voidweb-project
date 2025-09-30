<template>
  <div class="animate-pulse">
    <div class="space-y-5">
      <div v-for="i in rows" :key="i" class="grid grid-cols-8 gap-4">
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-2"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg col-span-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows?: number
}

withDefaults(defineProps<Props>(), {
  rows: 5
})
</script>