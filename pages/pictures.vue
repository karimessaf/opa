<template>
  <div class="h-full flex flex-col items-center justify-center gap-20">
    <h1 class="text-2xl font-bold text-center">
      Pictures we shared together <button
        class="cursor-pointer"
        @click="handleClickCamera"
      >
        📷
      </button>
    </h1>

    <UCarousel
      v-if="items"
      v-slot="{ item }"
      arrows
      dots
      auto-height
      :items="items"
      :ui="{
        container: 'transition-[height]',
        controls: 'absolute -top-8 inset-x-12',
        dots: '-top-7',
        dot: 'w-3 h-1',
      }"
      class="w-full max-w-4xl mx-auto"
    >
      <div class="aspect-[4/3] w-full space-y-2">
        <img
          :src="'/pictures/' + item"
          class="rounded-lg size-full object-contain"
          quality="80"
        >
        <h1 class="text-md italic text-center">
          {{ eventNameByImageName(item) }}
        </h1>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'

useHead({
  title: 'Hall of fame',
})

definePageMeta({
  middleware: ['auth'],
})

/* IMAGES */

const eventNameByImageName = (name: string) => {
  const match = name.match(/([a-zA-Z]+)[-\d].*$/)?.[1]

  if (!match) {
    return ''
  }

  return {
    baking: 'Baking, 2025',
    carnaval: 'Carnaval, 2025',
    lake: 'Meer van Genval, 2023',
    mav: 'Mise-au-vert, 2023',
    promo: 'Promo shoot, 2023',
    skyzone: 'Skyzone, 2025',
  }[match]
}

const { data: items } = await useFetch<string[]>('/api/pictures')

/* BACKGROUND IMAGE */

const { incrementEasterEggsCount } = useEasterEggs()
const hasSetBackgroundImage = useStorage('hasSetBackgroundImage', false)

const handleClickCamera = () => {
  hasSetBackgroundImage.value = !hasSetBackgroundImage.value
  incrementEasterEggsCount('wallpaper')
}
</script>
