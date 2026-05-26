<template>
  <div class="guestbook-view">
    <!-- Danmaku Background - Fixed -->
    <div class="danmaku-background wow animate__fadeInDown">
      <img
        src="@/assets/images/Sara1171257732029155.jpg"
        alt="弹幕背景"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Danmaku Container - Scrolls with page -->
    <div class="danmaku-container">
      <div
        v-for="danmaku in danmakuList"
        :key="danmaku.id"
        class="danmaku-item"
        :style="{
          top: danmaku.top + '%',
          animationDuration: danmaku.duration + 's',
          animationDelay: danmaku.delay + 's'
        }"
      >
        <img :src="danmaku.avatar" class="danmaku-avatar" />
        <span class="danmaku-text">{{ danmaku.text }}</span>
      </div>

      <!-- Input Area - Scrolls with page -->
      <div class="danmaku-input-wrapper">
        <div class="danmaku-input-container">
          <n-input
            v-model:value="danmakuInput"
            type="text"
            placeholder="输入弹幕内容..."
            size="large"
            @keyup.enter="sendDanmaku"
            class="danmaku-input"
          />
          <n-button
            ghost
            text
            round
            @click="sendDanmaku"
            class="btn-danmaku"
          >
            发射
          </n-button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container mx-auto px-4 py-8">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { NAvatar, NInput, NButton, useMessage } from 'naive-ui'
import { messages } from '@/data/mockData'
import { useWow } from '@/composables/useWow'
useWow() // 直接调用即可

const message = useMessage()
const danmakuInput = ref('')
const newMessage = ref('')
const nickname = ref('')
let danmakuId = 100

const myAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me'

const avatarSeeds = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Henry']

const getRandomAvatar = () => {
  const seed = avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)]
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
}

const defaultDanmakus = [
  '欢迎来到墨韵博客！',
  '这里的文章写得真好',
  '支持博主！',
  '路过留个脚印',
  '深夜来访，氛围真好',
  '每篇文章都很用心',
  '技术与文学的完美结合',
  '被治愈了',
  '期待更多精彩内容',
  '已收藏！',
  '今天也要加油鸭！',
  '好美的博客',
  '内容很有深度',
  '学到了很多',
  '相见恨晚',
  '愿岁月静好',
  '文字很美',
  '设计风格很喜欢',
  '持续关注中',
  '推荐给朋友了',
  '太棒了！',
  '已订阅',
  '每日必看',
  '宝藏博客',
  '文字有力量',
  '666',
  '太强了',
  'yyds',
  '绝绝子',
  '神仙博客',
  '爱了爱了',
  '爷青回',
  '破防了',
  '栓Q',
  '蚌埠住了',
  '绝绝子',
  '内卷了',
  '躺平了',
  'emo了',
  '氛围感拉满',
  '有被惊艳到',
  '干货满满',
  '受益匪浅',
  '醍醐灌顶',
  '脑洞大开',
  '干货十足',
  '疯狂打call',
  '前方高能',
  '名场面',
  '泪目了',
  '笑不活了',
  '社死现场',
  '大型真香现场',
  '爷青结',
  '这波血赚',
  '蚌埠住了',
  'y1s1',
  'awsl',
  'ssfd',
  'xswl',
  'bdjw',
  'nsdd',
  'zqsg',
  'plmm',
  'gg',
  'cpdd',
  'awsl',
  'slay全场',
  '美到犯规',
  '入股不亏',
  '神仙打架',
  '神仙颜值',
  '宝藏男孩',
  '宝藏女孩',
  '实力宠粉',
  '双向奔赴',
  '甜度超标',
  '磕到了',
  '上头了',
  '我可以',
  'pick你',
  '神仙联动',
  '梦幻联动',
  '神仙操作',
  '天秀',
  '下饭操作',
  '真实',
  '过于真实',
  '有内味了',
  '就挺突然的',
  '有被冒犯到',
  '大可不必',
  '你礼貌吗',
  '我裂开了',
  '心态崩了',
  '原地去世',
  '社会性死亡',
  '我太难了',
  '人生无常大肠包小肠',
  '格局打开',
  '拴Q了老铁',
  '咱就是说',
  '一整个爱住',
  '救命',
  '救命救命',
  '会谢',
  '离了个大谱',
  '主打一个陪伴'
]

const danmakuList = ref([])

const initDanmakus = () => {
  danmakuList.value = []
  defaultDanmakus.forEach((text, index) => {
    danmakuList.value.push({
      id: index,
      text,
      avatar: getRandomAvatar(),
      top: 5 + (index % 8) * 12,
      duration: 35 + Math.random() * 4,
      delay: index * 0.4
    })
  })
}

provide('isGuestbook', true)

const sendDanmaku = () => {
  if (!danmakuInput.value.trim()) {
    message.warning('请输入弹幕内容')
    return
  }
  
  danmakuList.value.push({
    id: danmakuId++,
    text: danmakuInput.value,
    avatar: getRandomAvatar(),
    top: 5 + Math.random() * 70,
    duration: 35 + Math.random() * 4,
    delay: 0
  })
  
  danmakuInput.value = ''
  message.success('弹幕发送成功！')
}

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
  initDanmakus()
})

onUnmounted(() => {
})
</script>

<style scoped>
.guestbook-view {
  min-height: 100vh;
}

.danmaku-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 0;
}

.danmaku-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 10;
}

.danmaku-item {
  position: absolute;
  right: -400px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  animation: danmaku-scroll linear forwards;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 50px;
}

.danmaku-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}

.danmaku-text {
  white-space: nowrap;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

@keyframes danmaku-scroll {
  0% {
    transform: translateX(0);
    right: -400px;
  }
  100% {
    transform: translateX(calc(-100vw - 400px));
    right: 100vw;
  }
}

.danmaku-input-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.danmaku-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.danmaku-input {
  width: 256px;
  max-width: 80vw;
  background: transparent !important;
}

.danmaku-input :deep(.n-input__border) {
  border: 1px solid #fff !important;
  border-radius: 20px;
}

.danmaku-input :deep(.n-input--focused .n-input__border),
.danmaku-input :deep(.n-input__border:hover) {
  border: none !important;
  box-shadow: none !important;
}

.danmaku-input :deep(.n-input__input) {
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.danmaku-input :deep(.n-input__placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

.btn-danmaku {
  color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 4px 16px;
  height: 40px;
  width: 80px;
}

.btn-danmaku:hover :deep(.n-button__text) {
  color: #fff !important;
}

.btn-danmaku :deep(.n-button__text) {
  color: #fff;
}

.main-content {
  position: relative;
  z-index: 20;
  background-color: var(--bg-color);
  min-height: 100vh;
}

@media (max-width: 768px) {
  .danmaku-text {
    font-size: 14px;
    padding: 4px 12px;
  }
  
  .danmaku-avatar {
    width: 24px;
    height: 24px;
  }
  
  .danmaku-input {
    width: 200px;
  }
}
</style>
