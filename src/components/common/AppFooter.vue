<template>
  <footer class="mt-20 py-10 glass footer">
    <div class="container mx-auto px-4">
      <div class="text-center text-sm text-white">
        <n-h4 class="mb-4 text-white leading-[30px]">关于本站</n-h4>
        <p class="text-sm text-white leading-[30px]">
            墨韵博客是一个个人文学创作与技术分享的空间，记录生活中的点滴感悟。
        </p>
        <p class="text-sm text-white leading-[30px]">&copy; 2026 墨韵博客 · 用心记录生活</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { NH4, NDivider, NIcon } from 'naive-ui'
import { LogoGithub, Mail } from '@vicons/ionicons5'

</script>

<style scoped>
.footer {
    background: url('@/assets/images/f.png') no-repeat;
    background-size: cover;
    background-position: center;
    border: none;
}
</style>
