<template>
  <div class="about-view container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Section -->
      <div class="glass rounded-xl p-8 mb-8 text-center wow fadeInUp">
        <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/30">
          <img :src="profile.avatar" :alt="profile.name" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-2xl font-bold mb-2">{{ profile.name }}</h1>
        <p class="mb-4" style="color: var(--text-secondary)">{{ profile.bio }}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <n-tag v-for="hobby in profile.hobby" :key="hobby" :bordered="false" size="small">
            {{ hobby }}
          </n-tag>
        </div>
      </div>

      <!-- Site Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="(stat, index) in statItems"
          :key="stat.label"
          class="glass rounded-xl p-4 text-center wow fadeInUp"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="text-2xl font-bold gradient-text">{{ stat.value }}</div>
          <div class="text-sm" style="color: var(--text-secondary)">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Site Info -->
      <div class="glass rounded-xl p-8 mb-8 wow fadeInUp" style="animation-delay: 0.2s">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <n-icon size="24"><InformationCircle /></n-icon>
          关于站点
        </h2>
        <div class="space-y-4 text-sm" style="color: var(--text-secondary)">
          <p><strong class="text-primary">站点名称：</strong>{{ siteInfo.name }}</p>
          <p><strong class="text-primary">建站时间：</strong>{{ siteInfo.founded }}</p>
          <p><strong class="text-primary">站点描述：</strong>{{ siteInfo.description }}</p>
          <p><strong class="text-primary">联系邮箱：</strong>{{ profile.email }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div class="glass rounded-xl p-8 mb-8 wow fadeInUp" style="animation-delay: 0.3s">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <n-icon size="24"><CodeSlash /></n-icon>
          技术栈
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div v-for="skill in skills" :key="skill.name" class="flex items-center gap-2">
            <n-icon :size="20" :style="{ color: skill.color }">
              <component :is="skill.icon" />
            </n-icon>
            <span class="text-sm">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Quote -->
      <div class="text-center py-8 wow fadeInUp" style="animation-delay: 0.4s">
        <p class="text-lg font-serif italic" style="color: var(--text-secondary)">
          "{{ siteInfo.slogan }}"
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { NTag, NIcon } from 'naive-ui'
import { InformationCircle, CodeSlash, LogoVue, LogoJavascript, Terminal } from '@vicons/ionicons5'
import { profile, siteInfo, siteStats } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const statItems = computed(() => [
  { label: '文章', value: siteStats.articles },
  { label: '浏览', value: siteStats.views },
  { label: '分类', value: siteStats.categories },
  { label: '标签', value: siteStats.tags }
])

const skills = [
  { name: 'Vue3', icon: LogoVue, color: '#42b883' },
  { name: 'JavaScript', icon: LogoJavascript, color: '#f7df1e' },
  { name: 'Node.js', icon: Terminal, color: '#339933' },
  { name: 'CSS3', icon: 'css3', color: '#1572b6' },
  { name: 'Python', icon: 'python', color: '#3776ab' },
  { name: 'Git', icon: 'git', color: '#f05032' }
]

onMounted(() => {

})
</script>
