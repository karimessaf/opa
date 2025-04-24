<template>
  <UApp class="min-h-screen">
    <div
      class="min-h-screen w-full relative"
      :class="{
        [`bg-[url('/images/athens.jpg')] bg-cover bg-center bg-fixed`]: mounted && hasSetBackgroundImage,
      }"
    >
      <div
        v-if="mounted && hasSetBackgroundImage"
        class="absolute inset-0 backdrop-blur-lg bg-black/20"
      />
      <UContainer class="min-h-screen relative">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UContainer>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref, onMounted } from 'vue'

const hasSetBackgroundImage = useStorage('hasSetBackgroundImage', false)

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>
