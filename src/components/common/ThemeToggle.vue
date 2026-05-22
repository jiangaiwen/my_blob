<template>
  <button
    @click="toggleTheme"
    class="relative w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-all"
    :title="isDark ? '切换到亮色模式' : '切换到深色模式'"
  >
    <transition name="fade" mode="out-in">
      <n-icon v-if="isDark" key="moon" size="20">
        <Moon />
      </n-icon>
      <n-icon v-else key="sun" size="20">
        <Sunny />
      </n-icon>
    </transition>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { Moon, Sunny } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
