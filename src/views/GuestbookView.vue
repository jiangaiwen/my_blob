<template>
  <div class="guestbook-view container mx-auto px-4 py-8">
    <BreadCrumb :items="[{ name: '留言板' }]" />

    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4 wow fadeIn">
        <span class="gradient-text">留言板</span>
      </h1>
      <p class="wow fadeInUp" style="color: var(--text-secondary)">
        有什么想说的？留个脚印吧
      </p>
    </div>

    <div class="max-w-3xl mx-auto">
      <!-- Message Input -->
      <div class="glass rounded-xl p-6 mb-8 wow fadeInUp">
        <div class="flex gap-4">
          <n-avatar :size="48" :src="myAvatar" />
          <div class="flex-1">
            <n-input
              v-model:value="newMessage"
              type="textarea"
              placeholder="写下你的留言..."
              :rows="3"
              class="mb-3"
            />
            <div class="flex justify-between items-center">
              <n-input v-model:value="nickname" placeholder="你的昵称" class="w-48" />
              <n-button type="primary" @click="submitMessage">
                发布留言
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages List -->
      <div class="space-y-4">
        <div
          v-for="(msg, index) in messages"
          :key="msg.id"
          class="glass rounded-xl p-5 wow fadeInUp"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex gap-4">
            <n-avatar :size="48" :src="msg.avatar" />
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium">{{ msg.nickname }}</span>
                <span class="text-xs" style="color: var(--text-secondary)">{{ msg.createTime }}</span>
              </div>
              <p class="text-sm" style="color: var(--text-secondary)">{{ msg.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mt-8">
        <n-button quaternary>加载更多</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NAvatar, NInput, NButton, useMessage } from 'naive-ui'
import { messages } from '@/data/mockData'
import BreadCrumb from '@/components/common/BreadCrumb.vue'

const message = useMessage()
const newMessage = ref('')
const nickname = ref('')
const myAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me'

const submitMessage = () => {
  if (!nickname.value.trim()) {
    message.warning('请输入昵称')
    return
  }
  if (!newMessage.value.trim()) {
    message.warning('请输入留言内容')
    return
  }
  message.success('留言发布成功！')
  newMessage.value = ''
}

onMounted(() => {
  if (window.WOW) {
    new WOW({ mobile: true, live: false }).init()
  }
})
</script>
