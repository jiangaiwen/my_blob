const e=[{id:1,name:"随笔",count:5,color:"#6366f1"},{id:2,name:"技术",count:4,color:"#10b981"},{id:3,name:"生活",count:3,color:"#f59e0b"},{id:4,name:"读书",count:2,color:"#ec4899"},{id:5,name:"旅行",count:1,color:"#06b6d4"}],t=[{id:1,name:"Vue3"},{id:2,name:"JavaScript"},{id:3,name:"CSS"},{id:4,name:"Node.js"},{id:5,name:"Python"},{id:6,name:"文学"},{id:7,name:"诗歌"},{id:8,name:"散文"},{id:9,name:"摄影"},{id:10,name:"设计"}],a={articles:12,views:15842,categories:5,tags:28},o=[{id:1,title:"秋日私语",excerpt:"秋风起，落叶黄，一叶知秋的时节，总能勾起人们心底最柔软的记忆。漫步在林间小道，脚下是沙沙作响的落叶，空气中弥漫着果实成熟的香气。",content:`# 秋日私语

秋风起，落叶黄，一叶知秋的时节，总能勾起人们心底最柔软的记忆。

## 林间漫步

漫步在林间小道，脚下是沙沙作响的落叶，空气中弥漫着果实成熟的香气。阳光透过枝叶的缝隙洒落，在地面上投下斑驳的光影。

> "停车坐爱枫林晚，霜叶红于二月花。"

这是杜牧笔下的秋日枫林，而我眼前的这片树林，虽无红叶，却有另一番韵味。

## 秋的思绪

秋日，总是让人思绪万千。

\`\`\`javascript
const autumn = {
  season: '秋',
  mood: '沉思',
  color: ['金黄', '火红', '橙褐'],
  feeling: '收获与离别交织'
}
\`\`\`

## 结语

秋天的美，美在一份清澈，美在一份宁静。愿你我都能在这个秋天，找到属于自己的那份从容与淡然。`,cover:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",category:1,tags:[6,7],views:1256,likes:89,comments:23,createTime:"2024-10-15",updateTime:"2024-10-15"},{id:2,title:"Vue3 Composition API 实战指南",excerpt:"深入解析 Vue3 Composition API 的核心概念与实践技巧，从响应式系统到自定义 Hook，全面掌握新一代 Vue 开发范式。",content:`# Vue3 Composition API 实战指南

深入解析 Vue3 Composition API 的核心概念与实践技巧。

## 什么是 Composition API

Composition API 是一组基于函数的 API，允许我们更好地组织逻辑和复用代码。

### 响应式系统

\`\`\`javascript
import { ref, reactive, computed, watch } from 'vue'

// 响应式数据
const count = ref(0)
const state = reactive({
  name: 'Vue3',
  version: '3.4'
})

// 计算属性
const doubled = computed(() => count.value * 2)

// 监听器
watch(count, (newVal, oldVal) => {
  console.log(\`count changed from \${oldVal} to \${newVal}\`)
})
\`\`\`

## 自定义 Hook

\`\`\`javascript
function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, increment, decrement }
}
\`\`\`

## 生命周期钩子

| 钩子 | 说明 |
|------|------|
| onMounted | 组件挂载完成后 |
| onUpdated | 组件更新后 |
| onUnmounted | 组件卸载后 |

## 总结

Composition API 提供了更灵活的代码组织方式，是 Vue3 开发的核心。`,cover:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",category:2,tags:[1,2],views:3421,likes:256,comments:45,createTime:"2024-10-10",updateTime:"2024-10-12"},{id:3,title:"深夜的咖啡馆",excerpt:"城市的喧嚣在深夜渐渐平息，而咖啡馆里的灯光却依然温暖。推开那扇熟悉的门，咖啡的香气扑面而来，仿佛回到了某个遥远的夜晚。",content:`# 深夜的咖啡馆

城市的喧嚣在深夜渐渐平息，而咖啡馆里的灯光却依然温暖。

## 午夜时分

推开那扇熟悉的门，咖啡的香气扑面而来。老板娘抬头看了我一眼，微微一笑，继续擦拭着杯子。

> "老样子？"
> "嗯，卡布奇诺，少糖。"

我找了个靠窗的位置坐下，窗外是寂静的街道，路灯拉长了树的影子。

## 独处的时光

深夜的咖啡馆，是一个适合独处的地方。

\`\`\`
在这里，可以什么都不想
也可以什么都想
时间是属于自己的
思绪是自由的
\`\`\`

## 温暖的存在

每一座城市，都需要这样一家深夜咖啡馆。

它不只是一个喝咖啡的地方，更是一个让灵魂暂时歇息的空间。在这里，你可以卸下所有的伪装，面对最真实的自己。`,cover:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",category:1,tags:[6,8],views:892,likes:67,comments:12,createTime:"2024-10-08",updateTime:"2024-10-08"},{id:4,title:"CSS Grid 布局完全指南",excerpt:"从基础概念到高级应用，系统性地掌握 CSS Grid 布局技术，打造现代化响应式页面设计。",content:`# CSS Grid 布局完全指南

从基础概念到高级应用，系统性地掌握 CSS Grid 布局技术。

## 网格容器

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

## 网格项

\`\`\`css
.item {
  grid-column: span 2;
  grid-row: span 1;
}
\`\`\`

## 命名网格线

\`\`\`css
.container {
  grid-template-columns: [left] 1fr [center] 2fr [right] 1fr;
}
\`\`\`

## 网格区域

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
\`\`\`

## 应用实例

Grid 布局让复杂的页面结构变得简单明了，是现代 CSS 布局的重要工具。`,cover:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",category:2,tags:[2,3],views:2156,likes:178,comments:34,createTime:"2024-10-05",updateTime:"2024-10-06"},{id:5,title:"雨后山林",excerpt:"一场秋雨过后，山林间弥漫着清新的气息。雾气缭绕，仿佛置身于仙境之中，让人忘却尘世的烦恼。",content:`# 雨后山林

一场秋雨过后，山林间弥漫着清新的气息。

## 雾气缭绕

清晨的山林，被一层薄雾笼罩。漫步其中，仿佛置身于仙境。

> 空山新雨后，天气晚来秋。

## 清新空气

雨后的空气，带着泥土和草木的芬芳。深吸一口，感受大自然最纯粹的馈赠。

## 宁静致远

在这里，一切都慢了下来。没有城市的喧嚣，只有鸟鸣和水声。`,cover:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&q=80",category:3,tags:[6,9],views:567,likes:45,comments:8,createTime:"2024-10-03",updateTime:"2024-10-03"},{id:6,title:"Node.js 异步编程精髓",excerpt:"深入理解 Node.js 事件循环、Promise、async/await，掌握高效的异步编程模式。",content:`# Node.js 异步编程精髓

深入理解 Node.js 事件循环、Promise、async/await。

## 事件循环

\`\`\`javascript
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

Promise.resolve().then(() => {
  console.log('3')
})

console.log('4')

// 输出顺序: 1, 4, 3, 2
\`\`\`

## Promise 链式调用

\`\`\`javascript
fetchData()
  .then(process)
  .then(save)
  .catch(handleError)
\`\`\`

## async/await

\`\`\`javascript
async function getData() {
  try {
    const result = await fetchData()
    return process(result)
  } catch (error) {
    handleError(error)
  }
}
\`\`\`

## 并行执行

\`\`\`javascript
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
])
\`\`\`

## 最佳实践

1. 总是使用 async/await
2. 正确处理错误
3. 避免回调地狱
4. 合理使用 Promise.all`,cover:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",category:2,tags:[2,4],views:1892,likes:134,comments:28,createTime:"2024-09-28",updateTime:"2024-09-30"},{id:7,title:"月光下的思念",excerpt:"月光如水，洒落在窗前的那株桂花树上。桂香暗浮，月色清朗，今夜的月，格外惹人思念。",content:`# 月光下的思念

月光如水，洒落在窗前的那株桂花树上。

## 桂香暗浮

桂香暗浮，月色清朗。今夜的月，格外惹人思念。

> "但愿人长久，千里共婵娟。"

## 静夜思

月光透过窗棂，在地板上投下斑驳的影子。这样的夜晚，适合想念，适合怀旧。

## 远方的人

此刻的你，是否也在仰望同一轮明月？

我知道，无论相隔多远，月光总会将我们的思念相连。`,cover:"https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=800&q=80",category:1,tags:[6,7],views:743,likes:56,comments:15,createTime:"2024-09-25",updateTime:"2024-09-25"},{id:8,title:"Python 数据处理实战",excerpt:"使用 Pandas、NumPy 进行数据清洗、分析与可视化，打造数据驱动的研究报告。",content:`# Python 数据处理实战

使用 Pandas、NumPy 进行数据清洗、分析与可视化。

## 数据读取

\`\`\`python
import pandas as pd

df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx')
\`\`\`

## 数据清洗

\`\`\`python
# 删除重复行
df.drop_duplicates()

# 处理缺失值
df.fillna(0)

# 数据类型转换
df['date'] = pd.to_datetime(df['date'])
\`\`\`

## 数据分析

\`\`\`python
# 分组统计
grouped = df.groupby('category').agg({
    'value': ['sum', 'mean', 'count']
})

# 数据透视
pivot = pd.pivot_table(df, values='value', index='date', columns='category')
\`\`\`

## 数据可视化

\`\`\`python
import matplotlib.pyplot as plt

df.plot(kind='line', x='date', y='value')
plt.title('数据趋势')
plt.show()
\`\`\`

## 总结

Python 提供了强大的数据处理能力，是数据科学家的首选工具。`,cover:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",category:2,tags:[5],views:1567,likes:98,comments:21,createTime:"2024-09-20",updateTime:"2024-09-22"},{id:9,title:"江南水乡",excerpt:"小桥流水，粉墙黛瓦。江南的美，美在一份诗意的婉约，让人沉醉不知归路。",content:`# 江南水乡

小桥流水，粉墙黛瓦。江南的美，美在一份诗意的婉约。

## 烟雨江南

春天的江南，是一首朦胧的诗。雨丝斜织，如烟如雾。

> "江南好，风景旧曾谙。日出江花红胜火，春来江水绿如蓝。"

## 水乡人家

沿河而建的房屋，错落有致。乌篷船缓缓驶过，荡起层层涟漪。

## 漫步老街

青石板铺就的小巷，两旁是古色古香的店铺。在这里，时间仿佛慢了下来。`,cover:"https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=800&q=80",category:3,tags:[6,9],views:921,likes:78,comments:19,createTime:"2024-09-15",updateTime:"2024-09-15"},{id:10,title:"读书笔记：《百年孤独》",excerpt:"魔幻现实主义的巅峰之作，布恩迪亚家族七代人的传奇故事，折射出拉丁美洲一个世纪以来风云变幻的历史。",content:`# 读书笔记：《百年孤独》

魔幻现实主义的巅峰之作。

## 作者简介

加西亚·马尔克斯，哥伦比亚作家，拉丁美洲魔幻现实主义文学的代表人物。

## 核心主题

- 孤独是人类的永恒困境
- 时间的循环与命运的重复
- 家族兴衰与历史变迁

## 经典摘录

> "多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。"

## 读后感

这部小说以其独特的叙事方式和丰富的想象力，构建了一个既真实又魔幻的世界。布恩迪亚家族的故事，是人类文明的一个缩影。`,cover:"https://images.unsplash.com/photo-1544716278-ca5e235f7b2d?w=800&q=80",category:4,tags:[6],views:634,likes:52,comments:16,createTime:"2024-09-10",updateTime:"2024-09-10"},{id:11,title:"北疆秋色",excerpt:"金秋十月，北疆的胡杨林换上了金色的盛装。蓝天白云下，金色的树叶与远处的雪山相映成趣，构成一幅壮美的画卷。",content:`# 北疆秋色

金秋十月，北疆的胡杨林换上了金色的盛装。

## 胡杨林

蓝天白云下，金色的树叶与远处的雪山相映成趣。

> 生而一千年不死
> 死而一千年不倒
> 倒而一千年不朽

这是胡杨精神，也是大漠魂。

## 日落时分

夕阳西下，整个胡杨林被染成了金红色。站在林间，感受着大自然最绚烂的色彩。

## 摄影技巧

拍摄胡杨林的最佳时间是日出和日落，光线柔和，色彩饱满。`,cover:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",category:5,tags:[9],views:812,likes:69,comments:11,createTime:"2024-09-05",updateTime:"2024-09-05"},{id:12,title:"Web 设计趋势 2024",excerpt:"从极简主义到动态界面，探索今年最具影响力的网页设计趋势与创新方向。",content:`# Web 设计趋势 2024

从极简主义到动态界面，探索今年最具影响力的网页设计趋势。

## 玻璃态设计

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

## 渐变色彩

大胆使用渐变色，从紫色到粉色，从蓝色到青色。

## 动态交互

- 微交互设计
- 滚动触发动画
- 3D 变换效果

## 深色模式

深色设计不仅美观，还能节省能源。

## 字体排版

大标题、粗体字、高对比度成为主流。

## 总结

2024 的设计趋势强调体验、创新与美感的有机结合。`,cover:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",category:2,tags:[2,3,10],views:2345,likes:187,comments:38,createTime:"2024-08-28",updateTime:"2024-08-30"}],s=[{id:1,nickname:"访客001",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",content:"博客设计得非常精美，内容也很优质，会持续关注的！",createTime:"2024-10-15 14:30"},{id:2,nickname:"路过的诗人",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",content:"文字很美，让人感到宁静。这片精神家园真的很棒。",createTime:"2024-10-14 19:22"},{id:3,nickname:"技术爱好者",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",content:"Vue3 的文章写得深入浅出，学到了很多！",createTime:"2024-10-13 09:15"},{id:4,nickname:"晨曦",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy",content:"喜欢这种简约而不简单的风格，继续加油！",createTime:"2024-10-12 21:45"},{id:5,nickname:"夜行者",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow",content:"深夜来这里读一篇文章，感觉整个人都被治愈了。",createTime:"2024-10-11 23:58"}],i=[{id:1,url:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",title:"秋日森林",category:"自然"},{id:2,url:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",title:"咖啡时光",category:"生活"},{id:3,url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600",title:"雨后山林",category:"自然"},{id:4,url:"https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600",title:"月光",category:"自然"},{id:5,url:"https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=600",title:"江南水乡",category:"旅行"},{id:6,url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",title:"北疆秋色",category:"旅行"},{id:7,url:"https://images.unsplash.com/photo-1544716278-ca5e235f7b2d?w=600",title:"读书时光",category:"生活"},{id:8,url:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",title:"设计灵感",category:"工作"},{id:9,url:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",title:"代码世界",category:"工作"},{id:10,url:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",title:"服务器",category:"工作"},{id:11,url:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",title:"数据流",category:"技术"},{id:12,url:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600",title:"创意设计",category:"工作"}],c=[{id:1,name:"破冰",url:"https://hao.love",description:"一个有温度的技术博客",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Ice"},{id:2,name:"静谧之林",url:"https:// forest.com",description:"记录生活的点滴美好",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Forest"},{id:3,name:"技术小站",url:"https://tech.site",description:"分享前端技术与经验",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Tech"},{id:4,name:"诗与远方",url:"https://poetry.com",description:"用文字丈量世界",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Poetry"},{id:5,name:"摄影集",url:"https://photo.com",description:"用镜头捕捉瞬间",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Photo"},{id:6,name:"读书笔记",url:"https://reading.com",description:"阅读，思考，成长",avatar:"https://api.dicebear.com/7.x/identicon/svg?seed=Book"}],r={name:"墨韵",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",bio:"一个热爱文学与技术的追梦人，在代码与诗篇之间寻找平衡。喜欢用文字记录生活，用镜头捕捉美好，用代码构建世界。",email:"contact@example.com",github:"https://github.com",location:"中国 · 北京",hobby:["阅读","摄影","编程","旅行","写作"]},n={name:"墨韵博客",slogan:"简约而不简单，文艺而不矫情",description:"这是一个个人文学创作与技术分享的空间，记录生活中的点滴感悟，分享技术路上的所学所获。",founded:"2023年"};export{o as a,r as b,e as c,a as d,c as l,s as m,i as p,n as s,t};
