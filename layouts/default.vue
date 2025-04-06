<template>
  <div class="min-h-screen">
    <UNavigationMenu
      highlight
      :items="items"
      class="w-full justify-center data-[orientation=vertical]:w-48"
    />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  title: 'OPA',
})

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Pictures',
    icon: 'i-heroicons-camera',
    to: '/pictures',
  },
  {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about',
  },
])
</script>
