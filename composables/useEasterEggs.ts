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
      toast.add({
        title: 'Easter egg found!',
        description: `${easterEggsCount.value}/${TOTAL_EASTER_EGGS} 🥚 found so far`,
      })
    }
  }

  return {
    easterEggsCount,
    incrementEasterEggsCount,
  }
}
