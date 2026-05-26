<template>
  <div class="fixed bottom-8 right-8 z-50">
    <n-popover
      placement="left"
      trigger="hover"
      :show-arrow="false"
      :duration="200"
    >
      <template #trigger>
        <button
          class="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-all shadow-lg"
        >
          <n-icon size="24">
            <Settings />
          </n-icon>
        </button>
      </template>

      <div class="w-48 glass rounded-xl shadow-xl p-4">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">主题模式</span>
            <button
              @click="toggleTheme"
              class="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all"
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
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors">
              <n-icon size="16">
                <ColorPalette />
              </n-icon>
              <span>自定义主题</span>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors">
              <n-icon size="16">
                <ColorPalette />
              </n-icon>
              <span>音效设置</span>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors">
              <n-icon size="16">
                <Notifications />
              </n-icon>
              <span>通知设置</span>
            </div>
          </div>
        </div>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon, NPopover } from 'naive-ui'
import { Settings, Moon, Sunny, ColorPalette, Notifications } from '@vicons/ionicons5'
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
