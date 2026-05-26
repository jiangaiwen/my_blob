<template>
  <div class="gallery-view container mx-auto px-4 py-8">
    <div class="relative w-full h-[120px] rounded-[20px] overflow-hidden mb-8 wow animate__fadeInUp">
      <video
        class="w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        src="/video/q.mp4"
      />
      <div style="position: absolute; left: 20px; top: 15px;color: #fff;">
        <div style="margin: 10px;">
            <div> 时光相册 </div>
            <div style="font-size: 20px; font-weight: bold; line-height: 1.5; margin-top: 20px;"> 用镜头捕捉生活的美好瞬间 </div>
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-2 mb-8 wow animate__fadeInUp">
      <n-tag
        v-for="cat in photoCategories"
        :key="cat"
        :bordered="false"
        :type="selectedCategory === cat ? 'primary' : 'default'"
        class="cursor-pointer transition-all"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </n-tag>
    </div>

    <!-- Photo Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(photo, index) in filteredPhotos"
        :key="photo.id"
        class="photo-item relative rounded-xl overflow-hidden cursor-pointer group wow animate__fadeInUp"
        :style="{ animationDelay: `${index * 0.05}s` }"
        @click="openPreview(photo)"
      >
        <img
          :src="photo.url"
          :alt="photo.title"
          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span class="text-white font-medium">{{ photo.title }}</span>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <n-modal v-model:show="showPreview" preset="card" :title="currentPhoto?.title" :width="900" :bordered="false">
      <div class="flex justify-center">
        <img
          v-if="currentPhoto"
          :src="currentPhoto.url"
          :alt="currentPhoto.title"
          class="max-h-[70vh] object-contain rounded-lg"
        />
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { NTag, NModal } from 'naive-ui'
import { photos } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const selectedCategory = ref('全部')
const showPreview = ref(false)
const currentPhoto = ref(null)

const photoCategories = computed(() => {
  const cats = ['全部', ...new Set(photos.map(p => p.category))]
  return cats
})

const filteredPhotos = computed(() => {
  if (selectedCategory.value === '全部') {
    return photos
  }
  return photos.filter(p => p.category === selectedCategory.value)
})

const openPreview = (photo) => {
  currentPhoto.value = photo
  showPreview.value = true
}

onMounted(() => {
  if (window.WOW) {
    new WOW({ mobile: true, live: false }).init()
  }
})
</script>
