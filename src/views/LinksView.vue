<template>
  <div class="links-view container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4 wow fadeIn">
        <span class="gradient-text">友情链接</span>
      </h1>
      <p class="wow fadeInUp" style="color: var(--text-secondary)">
        志同道合的朋友们
      </p>
    </div>

    <!-- Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <a
        v-for="(link, index) in links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        class="glass card-hover rounded-xl p-5 flex items-center gap-4 wow"
        :class="index % 3 === 0 ? 'fadeInLeft' : index % 3 === 1 ? 'fadeInUp' : 'fadeInRight'"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <n-avatar :size="56" round :src="link.avatar" />
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold mb-1 truncate hover:text-primary transition-colors">
            {{ link.name }}
          </h3>
          <p class="text-sm truncate" style="color: var(--text-secondary)">
            {{ link.description }}
          </p>
        </div>
      </a>
    </div>

    <!-- Apply Section -->
    <div class="max-w-2xl mx-auto mt-12">
      <div class="glass rounded-xl p-6 text-center wow fadeInUp">
        <h3 class="text-lg font-semibold mb-3">申请友链</h3>
        <p class="text-sm mb-4" style="color: var(--text-secondary)">
          如果您也有一个有趣的博客，欢迎申请友链交换
        </p>
        <div class="text-left space-y-3">
          <div class="flex items-center gap-3">
            <span class="w-20 text-sm font-medium">博客名称</span>
            <n-input placeholder="墨韵博客" />
          </div>
          <div class="flex items-center gap-3">
            <span class="w-20 text-sm font-medium">博客地址</span>
            <n-input placeholder="https://example.com" />
          </div>
          <div class="flex items-center gap-3">
            <span class="w-20 text-sm font-medium">博客描述</span>
            <n-input placeholder="一个有趣的博客" />
          </div>
          <div class="flex justify-end">
            <n-button type="primary">提交申请</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { NAvatar, NInput, NButton } from 'naive-ui'
import { links } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可
onMounted(() => {

})
</script>
