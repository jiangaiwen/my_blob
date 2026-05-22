<template>
  <footer class="mt-20 py-10 glass">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About -->
        <div>
          <n-h4 class="mb-4">关于本站</n-h4>
          <p class="text-sm" style="color: var(--text-secondary)">
            墨韵博客是一个个人文学创作与技术分享的空间，记录生活中的点滴感悟。
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <n-h4 class="mb-4">快速链接</n-h4>
          <div class="flex flex-wrap gap-2">
            <router-link
              v-for="item in quickLinks"
              :key="item.path"
              :to="item.path"
              class="text-sm px-3 py-1 rounded-full hover:bg-primary/10 transition-colors"
              style="color: var(--text-secondary)"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <n-h4 class="mb-4">联系交流</n-h4>
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <n-icon size="20">
                <component :is="social.icon" />
              </n-icon>
            </a>
          </div>
        </div>
      </div>

      <n-divider />

      <div class="text-center text-sm" style="color: var(--text-secondary)">
        <p>&copy; 2024 墨韵博客 · 用心记录生活</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { NH4, NDivider, NIcon } from 'naive-ui'
import { LogoGithub, Mail } from '@vicons/ionicons5'

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '相册', path: '/gallery' },
  { name: '留言板', path: '/guestbook' },
  { name: '关于', path: '/about' }
]

const socials = [
  { name: 'GitHub', icon: LogoGithub, url: 'https://github.com' },
  { name: 'Email', icon: Mail, url: 'mailto:contact@example.com' }
]
</script>
