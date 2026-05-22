<template>
  <transition name="slide-fade">
    <button
      v-show="show"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-all z-50 shadow-lg"
    >
      <n-icon size="24">
        <ArrowUp />
      </n-icon>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NIcon } from 'naive-ui'
import { ArrowUp } from '@vicons/ionicons5'

const show = ref(false)

const handleScroll = () => {
  show.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
