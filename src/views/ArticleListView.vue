<template>
  <div class="article-list-view container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4 wow fadeIn">
        <span class="gradient-text">文章列表</span>
      </h1>
      <p class="wow fadeInUp" style="color: var(--text-secondary)">
        记录思考，分享成长
      </p>
    </div>

    <!-- Filters -->
    <div class="glass rounded-xl p-4 mb-8 wow fadeInUp">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Category Filter -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">分类:</span>
          <n-tag
            v-for="cat in allCategories"
            :key="cat.id"
            :bordered="false"
            :type="selectedCategory === cat.id ? 'primary' : 'default'"
            class="cursor-pointer transition-all"
            @click="selectedCategory = selectedCategory === cat.id ? null : cat.id"
          >
            {{ cat.name }}
          </n-tag>
        </div>

        <n-divider vertical />

        <!-- Tag Filter -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">标签:</span>
          <n-tag
            v-for="tag in allTags"
            :key="tag.id"
            :bordered="false"
            :type="selectedTag === tag.id ? 'primary' : 'default'"
            class="cursor-pointer transition-all"
            @click="selectedTag = selectedTag === tag.id ? null : tag.id"
          >
            {{ tag.name }}
          </n-tag>
        </div>
      </div>
    </div>

    <!-- Article Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard
        v-for="(article, index) in filteredArticles"
        :key="article.id"
        :article="article"
        class="wow fadeInUp"
        :style="{ animationDelay: `${index * 0.05}s` }"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredArticles.length === 0" class="text-center py-20">
      <n-icon size="64" class="mb-4" style="color: var(--text-secondary)">
        <DocumentTextOutline />
      </n-icon>
      <p style="color: var(--text-secondary)">暂无相关文章</p>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center mt-8">
      <n-pagination
        v-model:page="currentPage"
        :page-count="totalPages"
        :page-slot="7"
        show-quick-jumper
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NTag, NDivider, NPagination, NIcon } from 'naive-ui'
import { DocumentTextOutline } from '@vicons/ionicons5'
import { articles, categories, tags } from '@/data/mockData'
import ArticleCard from '@/components/common/ArticleCard.vue'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const currentPage = ref(1)
const pageSize = 9
const selectedCategory = ref(null)
const selectedTag = ref(null)

const allCategories = computed(() => [{ id: null, name: '全部' }, ...categories])
const allTags = computed(() => [{ id: null, name: '全部' }, ...tags])

const filteredArticles = computed(() => {
  let result = articles

  if (selectedCategory.value) {
    result = result.filter(a => a.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    result = result.filter(a => a.tags.includes(selectedTag.value))
  }

  const start = (currentPage.value - 1) * pageSize
  return result.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(articles.length / pageSize))
</script>
