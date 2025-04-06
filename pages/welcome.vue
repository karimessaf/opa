<template>
  <div class="min-h-screen flex flex-col pt-[25%] pl-[15%]">
    <div class="flex items-center gap-4">
      <h1
        class="text-5xl"
        :class="{ 'pb-3': !isCorrectName }"
      >
        Welcome, {{ name }}
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
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { useStorage } from '@vueuse/core'

const POSSIBLE_NAMES = [
  'Agathos',
  'Αγαθός',
  'Disco chef',
  'Ντίσκο σεφ',
  'Nicholas',
  'Νικόλαος',
  'Nicholas Agathos',
  'Nikos Agathos',
  'Νικόλαος Αγαθός',
  'Niko',
  'Νίκο',
  'Nikos',
  'Νίκος',
]

definePageMeta({
  layout: 'authentication',
})

const router = useRouter()

const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

const name = ref('')
const isCorrectName = ref(false)

const checkName = () => {
  if (!name.value) {
    return
  }

  if (POSSIBLE_NAMES.includes(name.value)) {
    isCorrectName.value = true
  }
}

const debouncedCheckName = debounce(checkName, 500)

watch(name, () => {
  debouncedCheckName()
})

watch(isCorrectName, () => {
  if (isCorrectName.value) {
    name.value = 'Disco chef'
    hasBeenAuthenticated.value = true
    router.push('/home')
  }
})

onBeforeMount(() => {
  if (hasBeenAuthenticated.value) {
    router.push('/home')
  }
})
</script>
