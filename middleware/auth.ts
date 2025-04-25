import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to) => {
  const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

  if (to.path === '/welcome' && hasBeenAuthenticated.value) {
    return navigateTo('/')
  }

  if (!hasBeenAuthenticated.value && to.path !== '/welcome') {
    return navigateTo('/welcome')
  }
})
