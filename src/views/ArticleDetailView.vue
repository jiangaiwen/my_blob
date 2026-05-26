<template>
  <div class="article-detail-view container mx-auto px-4 py-8">
    <article v-if="article" class="max-w-4xl mx-auto">
      <!-- Cover -->
      <div class="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 wow fadeIn">
        <img :src="article.cover" :alt="article.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div class="absolute bottom-6 left-6 right-6">
          <n-tag :bordered="false" size="small" :color="{ color: categoryColor, textColor: '#fff' }">
            {{ categoryName }}
          </n-tag>
          <h1 class="text-2xl md:text-3xl font-bold text-white mt-3">{{ article.title }}</h1>
        </div>
      </div>

      <!-- Meta -->
      <div class="glass rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 wow fadeInUp">
        <div class="flex items-center gap-4 text-sm" style="color: var(--text-secondary)">
          <span class="flex items-center gap-1">
            <n-icon><Calendar /></n-icon>
            {{ article.createTime }}
          </span>
          <span class="flex items-center gap-1">
            <n-icon><Eye /></n-icon>
            {{ article.views }} 阅读
          </span>
          <span class="flex items-center gap-1">
            <n-icon><Heart /></n-icon>
            {{ article.likes }} 点赞
          </span>
        </div>
        <div class="flex gap-2">
          <n-tag v-for="tagId in article.tags" :key="tagId" :bordered="false" size="small">
            {{ getTagName(tagId) }}
          </n-tag>
        </div>
      </div>

      <!-- Content -->
      <div class="glass rounded-xl p-6 md:p-8 wow fadeInUp" style="animation-delay: 0.1s">
        <div class="markdown-body" v-html="renderedContent"></div>
      </div>

      <!-- Actions -->
      <div class="glass rounded-xl p-4 mt-8 flex items-center justify-between wow fadeInUp" style="animation-delay: 0.2s">
        <div class="flex items-center gap-4">
          <n-button type="primary" quaternary @click="handleLike">
            <template #icon>
              <n-icon><Heart /></n-icon>
            </template>
            点赞 ({{ article.likes }})
          </n-button>
          <n-button quaternary @click="handleShare">
            <template #icon>
              <n-icon><Share /></n-icon>
            </template>
            分享
          </n-button>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="glass rounded-xl p-6 mt-8 wow fadeInUp" style="animation-delay: 0.3s">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <n-icon size="20"><ChatboxEllipses /></n-icon>
          评论区
        </h3>

        <!-- Comment Input -->
        <div class="flex gap-3 mb-6">
          <n-avatar :size="40" :src="defaultAvatar" />
          <div class="flex-1">
            <n-input
              v-model:value="comment"
              type="textarea"
              placeholder="写下你的评论..."
              :rows="3"
            />
            <div class="flex justify-end mt-2">
              <n-button type="primary" size="small" @click="submitComment">
                发布评论
              </n-button>
            </div>
          </div>
        </div>

        <!-- Comments List -->
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex gap-3">
            <n-avatar :size="40" :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium">访客 {{ i }}</span>
                <span class="text-xs" style="color: var(--text-secondary)">{{ formatDate(i) }}</span>
              </div>
              <p class="mt-1 text-sm" style="color: var(--text-secondary)">
                这篇文章写得真好，受益匪浅！
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { NTag, NButton, NIcon, NAvatar, NInput, useMessage } from 'naive-ui'
import { Calendar, Eye, Heart, Share, ChatboxEllipses } from '@vicons/ionicons5'
import { articles, categories, tags } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const route = useRoute()
const message = useMessage()

const comment = ref('')
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me'

const article = computed(() => articles.find(a => a.id === Number(route.params.id)))

const categoryName = computed(() => {
  const cat = categories.find(c => c.id === article.value?.category)
  return cat?.name || '未分类'
})

const categoryColor = computed(() => {
  const cat = categories.find(c => c.id === article.value?.category)
  return cat?.color || '#6366f1'
})

const getTagName = (tagId) => {
  const tag = tags.find(t => t.id === tagId)
  return tag?.name || ''
}

marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

const renderedContent = computed(() => {
  if (article.value) {
    return marked(article.value.content)
  }
  return ''
})

const formatDate = (daysAgo) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toLocaleDateString('zh-CN')
}

const handleLike = () => {
  message.success('感谢您的点赞！')
}

const handleShare = () => {
  message.success('链接已复制到剪贴板！')
}

const submitComment = () => {
  if (comment.value.trim()) {
    message.success('评论发布成功！')
    comment.value = ''
  }
}

onMounted(() => {

})
</script>
