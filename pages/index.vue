<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const router = useRouter()

const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

onBeforeMount(() => {
  if (!hasBeenAuthenticated.value) {
    router.push('welcome')
  }
})
</script>
