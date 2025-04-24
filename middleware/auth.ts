// TODO: fix redirection
import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to) => {
  const hasBeenAuthenticated = useStorage('hasBeenAuthenticated', false)

  if (to.path === '/welcome' && hasBeenAuthenticated.value) {
    return navigateTo('/')
  }

  // If we're not authenticated and not on the welcome page, redirect to welcome
  if (!hasBeenAuthenticated.value && to.path !== '/welcome') {
    return navigateTo('/welcome')
  }
})
