<template>
  <div class="timeline-view container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold mb-4 wow fadeIn">
        <span class="gradient-text">时光轴</span>
      </h1>
      <p class="wow fadeInUp" style="color: var(--text-secondary)">
        记录成长的每一步
      </p>
    </div>

    <!-- Timeline -->
    <div class="max-w-3xl mx-auto relative">
      <!-- Center Line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-transparent" />

      <!-- Timeline Items -->
      <div
        v-for="(item, index) in timelineItems"
        :key="item.id"
        class="relative mb-8"
        :class="index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'"
      >
        <!-- Dot -->
        <div
          class="absolute top-6 w-4 h-4 rounded-full border-4 border-white z-10"
          :class="index % 2 === 0 ? 'right-1/2 transform translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'"
          :style="{ backgroundColor: item.color }"
        />

        <!-- Card -->
        <div
          class="glass rounded-xl p-5 wow"
          :class="index % 2 === 0 ? 'fadeInLeft mr-8' : 'fadeInRight ml-8'"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-center gap-3 mb-3">
            <n-tag :bordered="false" size="small" :color="{ color: item.color, textColor: '#fff' }">
              {{ item.type }}
            </n-tag>
            <span class="text-sm font-bold" :style="{ color: item.color }">{{ item.date }}</span>
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
          <p class="text-sm" style="color: var(--text-secondary)">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { NTag } from 'naive-ui'
import { articles } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const timelineItems = computed(() => {
  return [...articles]
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    .map((article, index) => ({
      id: article.id,
      title: article.title,
      description: article.excerpt.slice(0, 60) + '...',
      date: article.createTime,
      type: '文章',
      color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'][index % 5]
    }))
})

onMounted(() => {

})
</script>

<style scoped>
@media (max-width: 768px) {
  .timeline-view .absolute.left-1\/2 {
    left: 20px;
  }
}
</style>
