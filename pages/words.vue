<template>
  <div class="h-full py-20 flex flex-col items-center justify-center gap-10">
    <div class="flex flex-col gap-4">
      <UCard
        v-for="(word, index) in words"
        :key="word.key"
      >
        <div
          class="flex items-center gap-10"
          :class="{ 'flex-row-reverse': index % 2 === 0 }"
        >
          <img
            :src="word.image"
            class="rounded-lg w-64"
            :class="{ 'cursor-pointer': word.key === 'karim' }"
            @click="openGitHub(word.key)"
          >

          <div class="space-y-2">
            <p class="whitespace-pre-wrap">
              {{ word.text }}
            </p>

            <UModal v-if="word.key === 'pauline'">
              <span class="text-sm text-blue-300 underline cursor-pointer">Shared image</span>

              <template #content>
                <img src="/pictures/liar-cat.jpg">
              </template>
            </UModal>
          </div>
        </div>
      </UCard>
    </div>

    <USlideover class="self-end">
      <UButton
        class="max-w-max"
        label="What about you?"
      />

      <template #content>
        <div class="m-auto flex flex-col gap-6">
          <h1 class="text-lg font-semibold">
            Here are a few words you like to say
          </h1>

          <ul class="list-disc list-inside">
            <li>Opa!</li>
            <li>Wanna look at a fun bug?</li>
            <li>Pfiou, pfiou, pfiou!</li>
            <li>Cool...Cool, cool, cool</li>
            <li>Not Macedonia, <span class="italic">North Macedonia</span></li>
          </ul>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

useHead({
  title: 'Words',
})

const { incrementEasterEggsCount } = useEasterEggs()

const words = [
  {
    key: 'aurora',
    image: '/pictures/aurora.png',
    text: 'Hey youuuu, I will fucking miss you so baaaaad! Let me tell you few things... I know I arrived at the worst time for you at Smovin, and I’m sorry I didn’t get to know you when you were more excited about life at work. But honestly, it doesn’t matter. They say that in the hardest times, we find the best friends, and that’s true for colleagues too. I’m really happy I met an amazing greek guy like you in this tiny place called La Hulpe! It’s officially been 1 year that we know each other, three days ago, but it feels like much longer. I’m sure this isn’t a goodbye, just a “see you on Saturday for a drink.” I’m happy you’re finally letting go of something that has been heavy for you. You needed this, and you deserve it. Forget how it happened, what matters is that now you’re free. You’re one of the best people I’ve met here and in my life. You’re kind, passionate about so many things, always fun to talk to, super smart, and empathetic. You have so many great qualities, and maybe your only flaw is that you don’t always see how amazing you truly are. I hope this change in your life brings you peace and helps you enjoy the small things again. Un grande abbraccio Aurora',
  },
  {
    key: 'pauline',
    image: '/pictures/pauline.webp',
    text: 'Difficile de te dire au revoir après ces années à bosser ensemble ! Merci pour toutes les vidéos de chats, les discussions sur les dieux grecs, les blagues (parfois douteuses 😅), et les fous rires partagés. On n’aura pas eu le temps de manger ce fameux hamburger… mais c’est que partie remise ! Tu vas vraiment me manquer, même Manon va être déçue (ou pas 😂) Bonne route pour la suite, et surtout : que les dieux de l’Olympe veillent sur toi ! ✨',
  },
  {
    key: 'karim',
    image: '/pictures/karim.jpg',
    text: 'Hey, so I won\'t be as long as the others because this isn\'t goodbye. There\'s so much more to to talk about and fun to be had. We keep in touch ;) I keep recommending you anime, you keep recommending me tv shows and questionnable movies *cough* the lobster *cough*. See you around!',
  },
]

const openGitHub = (key: string) => {
  if (key !== 'karim') {
    return
  }

  incrementEasterEggsCount('karim-github')
  setTimeout(() => {
    window.open('https://github.com/karimessaf', '_blank')
  }, 500)
}
</script>
