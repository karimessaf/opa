import { useStorage } from '@vueuse/core'
import { TOTAL_EASTER_EGGS } from '~/utils/constants'

export const useEasterEggs = () => {
  const toast = useToast()

  const easterEggsCount = useStorage('easterEggsCount', 0)
  const foundEasterEggs = useStorage<string[]>('foundEasterEggs', [])

  const incrementEasterEggsCount = (easterEggId: string) => {
    if (foundEasterEggs.value.includes(easterEggId)) {
      return
    }

    easterEggsCount.value++
    foundEasterEggs.value.push(easterEggId)

    const isLastEasterEgg = easterEggsCount.value === TOTAL_EASTER_EGGS

    if (!isLastEasterEgg) {
      toast.add({
        title: 'Easter egg found!',
        description: `${easterEggsCount.value}/${TOTAL_EASTER_EGGS} 🥚 found so far`,
      })
    }
    else {
      toast.add({
        title: 'That was the last one!',
        description: 'Wow, you found all the easter eggs! 🎉 Did you have nothing better to do? Or did you cheat 🤨?',
        color: 'success',
      })
    }
  }

  return {
    easterEggsCount,
    incrementEasterEggsCount,
  }
}
