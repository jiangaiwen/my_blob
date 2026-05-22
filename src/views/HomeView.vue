<template>
  <div class="home-view">
    <!-- Background Wallpaper -->
    <div class="fixed inset-0 z-0">
      <!-- Loading Placeholder -->
      <div
        v-if="!imageLoaded"
        class="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center"
      >
        <n-spin size="large" />
      </div>
      <!-- Wallpaper Image -->
      <img
        :src="wallPaper"
        alt="背景壁纸"
        class="w-full h-full object-cover transition-opacity duration-1000"
        :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
        @load="imageLoaded = true"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-black/30" />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="w-full lg:w-80 flex-shrink-0">
          <div class="sticky top-24">
            <Sidebar class="wow fadeInLeft" />
          </div>
        </aside>

        <!-- Article List -->
        <main class="flex-1">
          <!-- Header Section -->
          <div class="mb-8 text-center lg:text-left">
            <h1 class="text-3xl md:text-4xl font-bold mb-4 wow fadeIn">
              <span class="gradient-text">欢迎来到墨韵博客</span>
            </h1>
            <p class="text-lg wow fadeInUp" style="color: var(--text-secondary);animation-delay: 0.1s">
              在文字与代码之间，寻找生活的诗意
            </p>
          </div>

          <!-- Latest Articles -->
          <section class="mb-12">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold flex items-center gap-2 wow fadeInUp">
                <n-icon size="24"><DocumentText /></n-icon>
                最新文章
              </h2>
              <router-link to="/articles" class="text-sm hover:text-primary transition-colors wow fadeInRight">
                查看全部 →
              </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArticleCard
                v-for="(article, index) in latestArticles"
                :key="article.id"
                :article="article"
                class="wow fadeInUp"
                :style="{ animationDelay: `${index * 0.1}s` }"
              />
            </div>
          </section>

          <!-- Hot Articles -->
          <section>
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-6 wow fadeInUp">
              <n-icon size="24"><Flame /></n-icon>
              热门文章
            </h2>
            <div class="space-y-4">
              <div
                v-for="(article, index) in hotArticles"
                :key="article.id"
                class="glass card-hover rounded-xl p-4 flex gap-4 cursor-pointer wow fadeInRight"
                :style="{ animationDelay: `${index * 0.1}s` }"
                @click="goToArticle(article.id)"
              >
                <img
                  :src="article.cover"
                  :alt="article.title"
                  class="w-24 h-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium mb-1 truncate hover:text-primary transition-colors">
                    {{ article.title }}
                  </h3>
                  <p class="text-sm line-clamp-1" style="color: var(--text-secondary)">
                    {{ article.excerpt }}
                  </p>
                  <div class="flex items-center gap-4 mt-2 text-xs" style="color: var(--text-secondary)">
                    <span class="flex items-center gap-1">
                      <n-icon size="12"><Eye /></n-icon>
                      {{ article.views }}
                    </span>
                    <span class="flex items-center gap-1">
                      <n-icon size="12"><Heart /></n-icon>
                      {{ article.likes }}
                    </span>
                    <span>{{ article.createTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NSpin } from 'naive-ui'
import { DocumentText, Flame, Eye, Heart } from '@vicons/ionicons5'
import { articles } from '@/data/mockData'
import { useAppStore } from '@/stores/app'
import Sidebar from '@/components/common/Sidebar.vue'
import ArticleCard from '@/components/common/ArticleCard.vue'

const router = useRouter()
const appStore = useAppStore()

const imageLoaded = ref(false)

const wallPaper = computed(() => appStore.wallPaper)

const latestArticles = computed(() => articles.slice(0, 4))
const hotArticles = computed(() => [...articles].sort((a, b) => b.views - a.views).slice(0, 5))

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

const handleImageError = () => {
  imageLoaded.value = true
}

onMounted(() => {
  if (window.WOW) {
    new WOW({ mobile: true, live: false }).init()
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
