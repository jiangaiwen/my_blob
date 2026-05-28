<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isGuestbook ? 'bg-transparent guestbook-nav' : 'glass'"
  >
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <n-gradient-text :size="24" :gradient="isDark ? 'linear-gradient(135deg, #818cf8, #ec4899)' : 'linear-gradient(135deg, #6366f1, #ec4899)'">
          墨韵
        </n-gradient-text>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link text-sm font-medium hover:text-primary transition-colors"
          active-class="text-primary"
        >
          {{ item.name }}
        </router-link>
        
        <!-- 娱乐下拉菜单 -->
        <div class="relative entertainment-dropdown">
          <span class="nav-link text-sm font-medium cursor-pointer hover:text-primary transition-colors flex items-center gap-1">
            娱乐
            <n-icon size="14"><ChevronDownOutline /></n-icon>
          </span>
          <div class="dropdown-menu">
            <router-link
              v-for="item in entertainmentItems"
              :key="item.path"
              :to="item.path"
              class="dropdown-item"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-4">
        <n-button v-if="isMobile" text @click="showDrawer = true">
          <template #icon>
            <n-icon><MenuOutline /></n-icon>
          </template>
        </n-button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <n-drawer v-model:show="showDrawer" :width="280" placement="right">
      <n-drawer-content title="导航菜单">
        <div class="flex flex-col gap-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors"
            active-class="bg-primary/10 text-primary"
            @click="showDrawer = false"
          >
            {{ item.name }}
          </router-link>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm font-medium mb-2 px-4" style="color: var(--text-secondary)">娱乐</p>
            <router-link
              v-for="item in entertainmentItems"
              :key="item.path"
              :to="item.path"
              class="nav-link py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors"
              active-class="bg-primary/10 text-primary"
              @click="showDrawer = false"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { NGradientText, NButton, NIcon, NDrawer, NDrawerContent } from 'naive-ui'
import { MenuOutline, ChevronDownOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const showDrawer = ref(false)
const isMobile = ref(false)
const isGuestbook = inject('isGuestbook', false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '时间线', path: '/timeline' },
  { name: '相册', path: '/gallery' },
  { name: '留言板', path: '/guestbook' },
  { name: '关于', path: '/about' }
]

const entertainmentItems = [
  { name: '五子棋', path: '/gomoku' }
]

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

checkMobile()
window.addEventListener('resize', checkMobile)
</script>

<style scoped>
.nav-link {
  color: var(--text-secondary);
}

:deep(.guestbook-nav) .nav-link {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.guestbook-nav) .nav-link:hover,
:deep(.guestbook-nav) .nav-link.router-link-active {
  color: #fff;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
}

.entertainment-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  padding: 4px 0;
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.entertainment-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--primary-color);
  color: #fff;
}
</style>
