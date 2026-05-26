<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <div id="blog-app" :data-theme="isDark ? 'dark' : 'light'" class="min-h-screen">
          <AppHeader />
          <main class="pt-16">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </main>
          <AppFooter />
          <AppSetting />
          <BackToTop />
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useThemeStore } from './stores/theme'
import { useAppStore } from './stores/app'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import BackToTop from './components/common/BackToTop.vue'
import AppSetting from './components/common/AppSetting.vue'

const themeStore = useThemeStore()
const appStore = useAppStore()

const isDark = computed(() => themeStore.isDark)

const themeOverrides = computed(() => ({
  common: {
    primaryColor: '#6366f1',
    fontFamily: 'Noto Sans SC, sans-serif'
  }
}))

onMounted(() => {
  themeStore.initTheme()
  appStore.fetchWallPaper()
  initWOW()
})

watch(() => themeStore.isDark, () => {
  document.documentElement.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light')
})

function initWOW() {
  if (typeof WOW !== 'undefined') {
    new WOW({ mobile: true, live: false }).init()
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#blog-app {
  background-color: var(--bg-color);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}
</style>
