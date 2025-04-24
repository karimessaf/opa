<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="min-h-screen flex flex-col pt-[25%] pl-[15%]">
    <div class="max-w-max space-y-4">
      <div class="flex flex-col gap-4 md:flex-row items-center">
        <h1
          class="text-5xl"
          :class="{ 'pb-3': !isCorrectName }"
        >
          Welcome, <span
            v-if="isCorrectName"
            class="transition-colors duration-300"
          >Disco chef, let's get you in...</span>
        </h1>

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-[-10px]"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-[10px]"
        >
          <UInput
            v-show="!isCorrectName"
            v-model="name"
            variant="ghost"
            color="neutral"
            placeholder="who are you?"
            size="xl"
          />
        </Transition>
      </div>

      <!-- BAD ATTEMPTS -->
      <h1
        v-show="name && attempts > 0 && !isCorrectName"
        class="text-xl text-right"
      >
        <span
          v-if="isImpersonating"
          class="text-red"
        >hey! no impersonating 😡, let's try something else...</span>

        <span
          v-else-if="hasCustomResponse"
          v-html="hasCustomResponse"
        />

        <span v-else-if="attempts > 30">how about just 'Nikos'?</span>

        <span
          v-else
          class="-mt-4 text-xs text-red-400"
        >Could not find anybody with that name</span>
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { useStorage } from '@vueuse/core'
import { POSSIBLE_NAMES, RESPONSE_BY_NAME } from '~/utils/constants'

definePageMeta({
  layout: 'authentication',
})

/* NAME CHECK */

const name = ref('')
const isCorrectName = ref(false)
const attempts = ref(0)

const checkNameValidity = () => {
  attempts.value++
  isCorrectName.value = !!POSSIBLE_NAMES.find(possibleName => possibleName.toLowerCase() === name.value.toLowerCase())
}

const debouncedCheckNameValidity = debounce(checkNameValidity, 500)

watch(name, () => {
  if (!name.value) {
    return
  }

  checkImpersonation()
  debouncedCheckNameValidity()
})

/* EASTER EGGS */

const { incrementEasterEggsCount } = useEasterEggs()

const hasCustomResponse = computed(() =>
  Object.keys(RESPONSE_BY_NAME).find(key => RESPONSE_BY_NAME[key].includes(name.value.toLowerCase())),
)

watch(hasCustomResponse, (value) => {
  if (value) {
    incrementEasterEggsCount(value)
  }
})

/* IMPERSONATION */

const isImpersonating = ref(false)

const checkImpersonation = () => {
  if (name.value.toLowerCase() !== 'karim') {
    return
  }

  isImpersonating.value = true
  incrementEasterEggsCount('karim')

  // Gradually remove the name from the input
  const interval = setInterval(() => {
    if (name.value && name.value.length > 0) {
      name.value = name.value.slice(0, -1)
    }
    else {
      clearInterval(interval)
      isImpersonating.value = false
    }
  }, 500)
}

/* ROUTING */

const router = useRouter()
const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

watch(isCorrectName, () => {
  if (isCorrectName.value) {
    hasBeenAuthenticated.value = true
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
})

onMounted(() => {
  const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

  if (hasBeenAuthenticated.value) {
    router.push('/')
  }
})
</script>
