<template>
  <div class="bread-crumb flex items-center gap-2 text-sm mb-6" style="color: var(--text-secondary)">
    <router-link to="/" class="hover:text-primary transition-colors">首页</router-link>
    <n-icon><ChevronForward /></n-icon>
    <template v-for="(item, index) in items" :key="index">
      <router-link v-if="item.path" :to="item.path" class="hover:text-primary transition-colors">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
      <n-icon v-if="index < items.length - 1"><ChevronForward /></n-icon>
    </template>
  </div>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { ChevronForward } from '@vicons/ionicons5'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
