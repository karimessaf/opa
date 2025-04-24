<template>
  <div class="text-center flex flex-col items-center justify-between space-y-10">
    <h1 class="text-2xl font-bold text-center">
      About this website
    </h1>

    <p>
      I made this website in a rush and with completely new technologies for me, so apologies for any bugs or issues.<br>
      You can have a look at the code in GitHub, maybe you'll find the missing easter eggs 😉
    </p>

    <USeparator v-if="!hasSetBackgroundImage" />

    <div class="space-y-4">
      <p>🥚 In total, you have found {{ easterEggsCount }} / {{ TOTAL_EASTER_EGGS }} easter eggs. Keep it up!</p>

      <UProgress
        v-model="easterEggsCount"
        status
        :max="TOTAL_EASTER_EGGS"
        class="w-full"
      />

      <p v-if="easterEggsCount === TOTAL_EASTER_EGGS">
        🎉 🎉That's all of them, congrats !!  🎉 🎉
      </p>

      <p v-else>
        <span>Psst, wanna change</span>

        <UButton
          color="warning"
          variant="ghost"
          class="p-1"
          label="who"
          @click="handleChangeWhoYouAre()"
        />

        <span>you are?</span>
      </p>
    </div>

    <USeparator v-if="!hasSetBackgroundImage" />

    <div class="space-y-4">
      <h1 class="text-2xl font-bold">
        Stack used
      </h1>

      <ul class="ml-4 list-disc list-inside flex flex-col items-start">
        <li>Vue 3</li>
        <li>Nuxt 3</li>
        <li>Pinia</li>
        <li>Tailwind CSS</li>
        <Li>ESLint</Li>
      </ul>

      <UPopover class="max-w-max">
        <UButton label="dependencies" />

        <template #content>
          <pre class="p-4">{{ dependencies }}</pre>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { TOTAL_EASTER_EGGS } from '~/utils/constants'
import packageJson from '~/package.json'

definePageMeta({
  middleware: ['auth'],
})

const dependencies = packageJson.dependencies

const { easterEggsCount } = useEasterEggs()
const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)
const hasSetBackgroundImage = useStorage('hasSetBackgroundImage', false)
const router = useRouter()

const handleChangeWhoYouAre = () => {
  hasBeenAuthenticated.value = false
  router.push('/welcome')
}
</script>
