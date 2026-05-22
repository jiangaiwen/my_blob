<template>
  <div class="sidebar glass rounded-xl p-6">
    <!-- Avatar & Name -->
    <div class="text-center mb-6">
      <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
        <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
      </div>
      <h2 class="text-xl font-semibold mb-1">{{ profile.name }}</h2>
      <p class="text-sm" style="color: var(--text-secondary)">{{ profile.bio.slice(0, 30) }}...</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div v-for="stat in statItems" :key="stat.label" class="text-center p-3 rounded-lg bg-primary/5">
        <div class="text-lg font-bold gradient-text">{{ stat.value }}</div>
        <div class="text-xs" style="color: var(--text-secondary)">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Social Links -->
    <div class="flex justify-center gap-3 mb-6">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.url"
        target="_blank"
        class="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <n-icon size="18">
          <component :is="social.icon" />
        </n-icon>
      </a>
    </div>

    <!-- Tags -->
    <div class="mb-6">
      <h4 class="text-sm font-semibold mb-3">标签云</h4>
      <div class="flex flex-wrap gap-2">
        <n-tag
          v-for="tag in tags.slice(0, 8)"
          :key="tag.id"
          :bordered="false"
          size="small"
          class="cursor-pointer hover:bg-primary/20 transition-colors"
        >
          {{ tag.name }}
        </n-tag>
      </div>
    </div>

    <!-- Categories -->
    <div>
      <h4 class="text-sm font-semibold mb-3">分类</h4>
      <div class="space-y-2">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-center justify-between py-1 px-2 rounded hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: cat.color }"></span>
            {{ cat.name }}
          </span>
          <span class="text-xs" style="color: var(--text-secondary)">{{ cat.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon, NTag } from 'naive-ui'
import { Mail, LogoGithub } from '@vicons/ionicons5'
import { profile, tags, categories, siteStats } from '@/data/mockData'

const socials = [
  { name: 'GitHub', icon: LogoGithub, url: profile.github },
  { name: 'Email', icon: Mail, url: `mailto:${profile.email}` }
]

const statItems = computed(() => [
  { label: '文章', value: siteStats.articles },
  { label: '浏览', value: siteStats.views },
  { label: '分类', value: siteStats.categories },
  { label: '标签', value: siteStats.tags }
])
</script>
