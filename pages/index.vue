<template>
  <div class="space-y-10">
    <div class="flex gap-5 w-full">
      <UCard
        :variant="variant"
        class="w-full"
      >
        <template #header>
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-bold">Captain's Log</span>

            <UTooltip
              text="Hey, Nikos, so... I don't really know much about Star Trek, even though I watched a few episodes so far. So, sorry if there are mistakes haha 🙏"
              :delay-duration="0"
            >
              <UIcon
                name="i-heroicons-light-bulb"
                class="size-5"
              />
            </UTooltip>
          </div>
        </template>

        <p>
          Stardate {{ dayjs().format('DD MMMM YYYY') }}.<br>
          After 3 years of valiant service aboard the USS Smovin, Nikos is departing for a new mission.<br><br>
          This website chronicles his journey.
        </p>
      </UCard>

      <UCard
        :variant="variant"
        class="shrink-0 w-fit cursor-pointer"
      >
        <UModal
          title="Look at this duuuuuuude"
          description="Hey, just for the meme 😛"
        >
          <img
            src="/images/disco-chef.jpeg"
            alt="Disco chef"
            class="size-48 object-cover"
            @click="incrementEasterEggsCount('disco-chef')"
          >

          <template #body>
            <div class="aspect-video w-full">
              <iframe
                class="w-full h-full"
                src="https://www.youtube.com/embed/9gyxzFPzcO0?autoplay=1"
                title="YouTube video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </template>
        </UModal>
      </UCard>
    </div>

    <UCard :variant="variant">
      <template #header>
        <span class="text-sm font-bold">Away missions</span>
      </template>

      <ul class="list-disc list-inside">
        <li>Cigarette breaks successfully taken</li>
        <li>Beach volley tournament successfully lost</li>
        <li>Tech lead outstayed</li>
        <li>Tons of bugs obliterated</li>
        <li>Many bugs introduced (jk)</li>
        <li>Crazy features implemented</li>
        <li>
          Still online playing <button
            class="text-blue-200 cursor-pointer"
            @click="handleNGUIdle()"
          >
            NGU IDLE
          </button>
        </li>
        <li>2 Cats near office spotted</li>
        <li>Huge amount of coffee jugs drunk</li>
        <li>Quand il était ado, il ressemblait à Thimothé Chalamet</li>
        <li>Il a des supers conseils de livre</li>
        <li>Son père est une sorte de Sheldon Cooper</li>
        <li>S'il pouvait vivre quelque part en Belgique, ce serait près de la Roche en Ardenne</li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'

definePageMeta({
  middleware: ['auth'],
})

const { incrementEasterEggsCount } = useEasterEggs()
const hasSetBackgroundImage = useStorage('hasSetBackgroundImage', false)

const variant = computed(() => hasSetBackgroundImage.value ? 'outline' : 'soft')

const handleNGUIdle = () => {
  incrementEasterEggsCount('nguidle')

  setTimeout(() => {
    window.open('https://store.steampowered.com/app/1147690/NGU_IDLE/', '_blank')
  }, 500)
}
</script>
