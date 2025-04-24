import { useStorage } from '@vueuse/core'
import { TOTAL_EASTER_EGGS } from '~/utils/constants'

export const useEasterEggs = () => {
  const toast = useToast()

  const easterEggsCount = useStorage('easterEggsCount', 0)
  const foundEasterEggs = useStorage<string[]>('foundEasterEggs', [])

  const incrementEasterEggsCount = (easterEggId: string) => {
    if (!foundEasterEggs.value.includes(easterEggId)) {
      easterEggsCount.value++
      foundEasterEggs.value.push(easterEggId)

      const isLastEasterEgg = easterEggsCount.value === TOTAL_EASTER_EGGS

      const title = isLastEasterEgg ? 'That was the last one!' : 'Easter egg found!'

      let description = `${easterEggsCount.value}/${TOTAL_EASTER_EGGS} 🥚 found so far`
      if (isLastEasterEgg) {
        description = 'Wow, you found all the easter eggs! 🎉 Did you have nothing better to do? Or did you cheat 🤨?'
      }

      const color = isLastEasterEgg ? 'success' : 'primary'

      toast.add({ title, description, color })
    }
  }

  return {
    easterEggsCount,
    incrementEasterEggsCount,
  }
}
