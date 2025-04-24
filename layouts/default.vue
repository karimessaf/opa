<template>
  <div class="min-h-screen space-y-10">
    <div class="flex justify-between items-center">
      <UNavigationMenu
        highlight
        :items="items"
        class="w-full justify-center data-[orientation=vertical]:w-48"
      />
      <UAvatar alt="N" />
    </div>
    <NuxtPage class="pb-10" />
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
    label: 'Hall of fame',
    icon: 'i-heroicons-camera',
    to: '/pictures',
  },
  {
    label: 'Words',
    icon: 'i-heroicons-document-text',
    to: '/words',
  },
  {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about',
  },
])
</script>
