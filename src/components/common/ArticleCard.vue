<template>
  <div class="article-card glass card-hover rounded-xl overflow-hidden cursor-pointer" @click="goToArticle">
    <!-- Cover -->
    <div class="relative h-48 overflow-hidden">
      <img :src="article.cover" :alt="article.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div class="absolute bottom-3 left-3 right-3">
        <n-tag :bordered="false" size="small" :color="{ color: categoryColor, textColor: '#fff' }">
          {{ categoryName }}
        </n-tag>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
        {{ article.title }}
      </h3>
      <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-secondary)">
        {{ article.excerpt }}
      </p>

      <!-- Meta -->
      <div class="flex items-center justify-between text-xs" style="color: var(--text-secondary)">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <n-icon size="14"><Calendar /></n-icon>
            {{ article.createTime }}
          </span>
          <span class="flex items-center gap-1">
            <n-icon size="14"><Eye /></n-icon>
            {{ article.views }}
          </span>
        </div>
        <span class="flex items-center gap-1">
          <n-icon size="14"><ChatboxEllipses /></n-icon>
          {{ article.comments }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NTag, NIcon } from 'naive-ui'
import { Calendar, Eye, ChatboxEllipses } from '@vicons/ionicons5'
import { categories } from '@/data/mockData'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const categoryName = computed(() => {
  const cat = categories.find(c => c.id === props.article.category)
  return cat ? cat.name : '未分类'
})

const categoryColor = computed(() => {
  const cat = categories.find(c => c.id === props.article.category)
  return cat ? cat.color : '#6366f1'
})

const goToArticle = () => {
  router.push(`/article/${props.article.id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
