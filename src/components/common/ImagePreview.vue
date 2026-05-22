<template>
  <n-modal v-model:show="showModal" preset="card" :title="currentPhoto?.title" :width="900" :bordered="false">
    <div class="flex justify-center">
      <img :src="currentPhoto?.url" :alt="currentPhoto?.title" class="max-h-[70vh] object-contain rounded-lg" />
    </div>
  </n-modal>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  photo: Object
})

const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const currentPhoto = computed(() => props.photo)
</script>
