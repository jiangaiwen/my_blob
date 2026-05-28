<template>
    <div class="game-container">
        <div class="game-wrapper">
            <!-- 游戏设置界面 -->
            <div v-if="!gameStarted" class="setup-screen">
                <div class="setup-container">
                    <div class="setup-header">
                        <h1 class="setup-title">
                            <span class="title-icon">●</span>
                            五子棋
                            <span class="title-icon white">○</span>
                        </h1>
                        <p class="setup-subtitle">经典策略对弈游戏</p>
                    </div>

                    <n-card class="setup-card" :bordered="false">
                        <div class="setup-section">
                            <h3 class="section-title">
                                <n-icon>
                                    <GameControllerOutline />
                                </n-icon>
                                选择游戏模式
                            </h3>
                            <div class="mode-selector">
                                <div class="mode-option" :class="{ active: gameMode === 'pvp' }"
                                    @click="gameMode = 'pvp'">
                                    <div class="mode-icon">
                                        <n-icon size="32">
                                            <PeopleOutline />
                                        </n-icon>
                                    </div>
                                    <span class="mode-label">双人对战</span>
                                    <span class="mode-desc">与好友对弈</span>
                                </div>
                                <div class="mode-option" :class="{ active: gameMode === 'pve' }"
                                    @click="gameMode = 'pve'">
                                    <div class="mode-icon">
                                        <n-icon size="32">
                                            <DesktopOutline />
                                        </n-icon>
                                    </div>
                                    <span class="mode-label">人机对战</span>
                                    <span class="mode-desc">挑战电脑</span>
                                </div>
                                <div class="mode-option disabled" :class="{ active: gameMode === 'online' }">
                                    <div class="mode-icon">
                                        <n-icon size="32">
                                            <GlobeOutline />
                                        </n-icon>
                                    </div>
                                    <span class="mode-label">联机对战</span>
                                    <span class="mode-desc">敬请期待</span>
                                    <span class="coming-soon">即将推出</span>
                                </div>
                            </div>
                        </div>

                        <div class="setup-section">
                            <h3 class="section-title">
                                <n-icon>
                                    <ColorPaletteOutline />
                                </n-icon>
                                选择棋子颜色
                            </h3>
                            <div class="color-selector">
                                <div class="color-option" :class="{ active: playerColor === 'black' }"
                                    @click="playerColor = 'black'">
                                    <div class="stone-preview black"></div>
                                    <span class="color-label">黑棋</span>
                                </div>
                                <div class="color-option" :class="{ active: playerColor === 'white' }"
                                    @click="playerColor = 'white'">
                                    <div class="stone-preview white"></div>
                                    <span class="color-label">白棋</span>
                                </div>
                            </div>
                        </div>

                        <div class="setup-section">
                            <h3 class="section-title">
                                <n-icon>
                                    <FlagOutline />
                                </n-icon>
                                选择先后手
                            </h3>
                            <div class="order-selector">
                                <div class="order-option" :class="{ active: playerFirst }" @click="playerFirst = true">
                                    <div class="order-icon first">1</div>
                                    <span class="order-label">先手</span>
                                    <span class="order-desc">你先下</span>
                                </div>
                                <div class="order-option" :class="{ active: !playerFirst }"
                                    @click="playerFirst = false">
                                    <div class="order-icon second">2</div>
                                    <span class="order-label">后手</span>
                                    <span class="order-desc">{{ gameMode === 'pve' ? '电脑先下' : '对方先下' }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="gameMode === 'pve'" class="setup-section">
                            <h3 class="section-title">
                                <n-icon>
                                    <SpeedometerOutline />
                                </n-icon>
                                AI 难度
                            </h3>
                            <div class="difficulty-selector">
                                <div class="difficulty-option" :class="{ active: aiDifficulty === 'easy' }"
                                    @click="aiDifficulty = 'easy'">
                                    <span class="difficulty-label">简单</span>
                                </div>
                                <div class="difficulty-option" :class="{ active: aiDifficulty === 'medium' }"
                                    @click="aiDifficulty = 'medium'">
                                    <span class="difficulty-label">中等</span>
                                </div>
                                <div class="difficulty-option" :class="{ active: aiDifficulty === 'hard' }"
                                    @click="aiDifficulty = 'hard'">
                                    <span class="difficulty-label">困难</span>
                                </div>
                            </div>
                        </div>

                        <n-button type="primary" size="large" block class="start-button" @click="startGame">
                            <template #icon>
                                <n-icon>
                                    <PlayOutline />
                                </n-icon>
                            </template>
                            开始游戏
                        </n-button>
                    </n-card>

                    <!-- 历史比分 -->
                    <div class="history-scores">
                        <div class="score-item">
                            <span class="stone-mini black"></span>
                            <span class="score-value">{{ scores.black }}</span>
                            <span class="score-label">黑棋胜</span>
                        </div>
                        <div class="score-divider">|</div>
                        <div class="score-item">
                            <span class="stone-mini white"></span>
                            <span class="score-value">{{ scores.white }}</span>
                            <span class="score-label">白棋胜</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 游戏界面 -->
            <div v-else class="game-screen">
                <!-- 标题区域 -->
                <div class="header">
                    <h1 class="title">
                        <span class="title-icon">●</span>
                        五子棋
                        <span class="title-icon white">○</span>
                    </h1>
                    <p class="subtitle">
                        {{ gameMode === 'pve' ? '人机对战' : '双人对战' }} ·
                        {{ playerColorLabel }}
                        {{ playerFirst ? '(先手)' : '(后手)' }}
                    </p>
                </div>

                <div class="game-content">
                    <!-- 左侧信息面板 -->
                    <div class="info-panel">
                        <n-card class="status-card" :bordered="false">
                            <div class="current-player">
                                <div class="player-indicator"
                                    :class="{ black: currentPlayer === 1, white: currentPlayer === 2 }">
                                    <span class="stone" :class="currentPlayer === 1 ? 'black' : 'white'"></span>
                                </div>
                                <div class="player-info">
                                    <span class="label">当前回合</span>
                                    <span class="player-name">
                                        {{ getCurrentPlayerName() }}
                                        <span v-if="isAiThinking" class="thinking-indicator">思考中...</span>
                                    </span>
                                </div>
                            </div>
                        </n-card>

                        <n-card class="stats-card" :bordered="false">
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-value">{{ moveCount }}</span>
                                    <span class="stat-label">步数</span>
                                </div>
                                <div class="stat-divider"></div>
                                <div class="stat-item">
                                    <span class="stat-value">{{ formatTime(gameTime) }}</span>
                                    <span class="stat-label">用时</span>
                                </div>
                            </div>
                        </n-card>

                        <n-card class="score-card" :bordered="false">
                            <div class="score-board">
                                <div class="score-item">
                                    <span class="stone black"></span>
                                    <span class="score">{{ scores.black }}</span>
                                    <span class="score-label">黑棋胜</span>
                                </div>
                                <div class="score-vs">VS</div>
                                <div class="score-item">
                                    <span class="stone white"></span>
                                    <span class="score">{{ scores.white }}</span>
                                    <span class="score-label">白棋胜</span>
                                </div>
                            </div>
                        </n-card>

                        <div class="action-buttons">
                            <n-button type="primary" size="large" block @click="restartGame" :disabled="isAiThinking">
                                <template #icon>
                                    <n-icon>
                                        <RefreshOutline />
                                    </n-icon>
                                </template>
                                重新开始
                            </n-button>
                            <n-button size="large" block @click="undoMove" :disabled="!canUndo">
                                <template #icon>
                                    <n-icon>
                                        <ArrowUndoOutline />
                                    </n-icon>
                                </template>
                                悔棋
                            </n-button>
                            <n-button size="large" block @click="backToSetup">
                                <template #icon>
                                    <n-icon>
                                        <ArrowBackOutline />
                                    </n-icon>
                                </template>
                                返回设置
                            </n-button>
                        </div>
                    </div>

                    <!-- 棋盘区域 -->
                    <div class="board-container">
                        <div class="board" ref="boardRef">
                            <!-- 棋盘背景网格 -->
                            <svg class="board-grid" :viewBox="`0 0 ${boardSize * cellSize} ${boardSize * cellSize}`">
                                <!-- 横线 -->
                                <line v-for="i in boardSize" :key="'h' + i" :x1="cellSize / 2"
                                    :y1="cellSize / 2 + (i - 1) * cellSize" :x2="cellSize * boardSize - cellSize / 2"
                                    :y2="cellSize / 2 + (i - 1) * cellSize" class="grid-line" />
                                <!-- 竖线 -->
                                <line v-for="i in boardSize" :key="'v' + i" :x1="cellSize / 2 + (i - 1) * cellSize"
                                    :y1="cellSize / 2" :x2="cellSize / 2 + (i - 1) * cellSize"
                                    :y2="cellSize * boardSize - cellSize / 2" class="grid-line" />
                                <!-- 星位点 -->
                                <circle v-for="point in starPoints" :key="'star' + point.x + point.y"
                                    :cx="cellSize / 2 + point.x * cellSize" :cy="cellSize / 2 + point.y * cellSize"
                                    r="4" class="star-point" />
                            </svg>

                            <!-- 棋子层 -->
                            <div class="stones-layer">
                                <div v-for="(row, y) in board" :key="'row' + y" class="board-row">
                                    <div v-for="(cell, x) in row" :key="'cell' + x + '-' + y" class="cell"
                                        :style="{ width: cellSize + 'px', height: cellSize + 'px' }"
                                        @click="makeMove(x, y)" @mouseenter="hoverPos = { x, y }"
                                        @mouseleave="hoverPos = null">
                                        <!-- 已落子 -->
                                        <transition name="stone-drop">
                                            <div v-if="cell !== 0" class="stone" :class="[
                                                cell === 1 ? 'black' : 'white',
                                                { 'last-move': lastMove?.x === x && lastMove?.y === y },
                                                { 'winning': isWinningStone(x, y) }
                                            ]">
                                                <span v-if="lastMove?.x === x && lastMove?.y === y"
                                                    class="last-indicator"></span>
                                            </div>
                                        </transition>

                                        <!-- 悬停预览 -->
                                        <div v-if="cell === 0 && hoverPos?.x === x && hoverPos?.y === y && !gameOver && canPlayerMove"
                                            class="stone preview" :class="currentPlayer === 1 ? 'black' : 'white'">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 右侧历史记录 -->
                    <div class="history-panel">
                        <n-card class="history-card" :bordered="false">
                            <template #header>
                                <div class="history-header">
                                    <n-icon size="18">
                                        <TimeOutline />
                                    </n-icon>
                                    <span>落子记录</span>
                                </div>
                            </template>
                            <n-scrollbar style="max-height: 400px">
                                <div class="history-list">
                                    <div v-for="(move, index) in history" :key="index" class="history-item"
                                        :class="{ last: index === history.length - 1 }">
                                        <span class="move-number">{{ index + 1 }}</span>
                                        <span class="stone-mini" :class="move.player === 1 ? 'black' : 'white'"></span>
                                        <span class="move-pos">({{ move.x + 1 }}, {{ move.y + 1 }})</span>
                                        <span v-if="gameMode === 'pve'" class="move-who">
                                            {{ move.isAi ? 'AI' : '你' }}
                                        </span>
                                    </div>
                                    <div v-if="history.length === 0" class="empty-history">
                                        暂无落子记录
                                    </div>
                                </div>
                            </n-scrollbar>
                        </n-card>
                    </div>
                </div>

                <!-- 胜利弹窗 -->
                <n-modal v-model:show="showWinModal" preset="card" style="width: 400px" :bordered="false">
                    <div class="win-modal">
                        <div class="win-icon" :class="winner === 1 ? 'black' : 'white'">
                            <span class="stone large" :class="winner === 1 ? 'black' : 'white'"></span>
                        </div>
                        <h2 class="win-title">{{ getWinnerName() }}</h2>
                        <p class="win-stats">共 {{ moveCount }} 步，用时 {{ formatTime(gameTime) }}</p>
                        <div class="win-actions">
                            <n-button type="primary" size="large" @click="restartGame">
                                再来一局
                            </n-button>
                            <n-button size="large" @click="backToSetup">
                                返回设置
                            </n-button>
                        </div>
                    </div>
                </n-modal>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { NCard, NButton, NIcon, NModal, NScrollbar, useMessage } from 'naive-ui'
import {
    RefreshOutline,
    ArrowUndoOutline,
    TimeOutline,
    GameControllerOutline,
    PeopleOutline,
    DesktopOutline,
    GlobeOutline,
    ColorPaletteOutline,
    FlagOutline,
    PlayOutline,
    ArrowBackOutline,
    SpeedometerOutline
} from '@vicons/ionicons5'

const message = useMessage()

// 游戏配置
const boardSize = 15
const cellSize = 36

// 游戏设置状态
const gameStarted = ref(false)
const gameMode = ref('pve') // 'pvp' | 'pve' | 'online'
const playerColor = ref('black') // 'black' | 'white'
const playerFirst = ref(true)
const aiDifficulty = ref('medium') // 'easy' | 'medium' | 'hard'

// 游戏状态
const board = ref([])
const currentPlayer = ref(1) // 1: 黑棋, 2: 白棋
const gameOver = ref(false)
const winner = ref(0)
const showWinModal = ref(false)
const hoverPos = ref(null)
const lastMove = ref(null)
const winningStones = ref([])
const history = ref([])
const moveCount = computed(() => history.value.length)
const isAiThinking = ref(false)

// 玩家棋子编号
const playerStone = computed(() => playerColor.value === 'black' ? 1 : 2)
const aiStone = computed(() => playerColor.value === 'black' ? 2 : 1)

// 计时器
const gameTime = ref(0)
let timer = null

// 比分
const scores = ref({ black: 0, white: 0 })

// 玩家颜色标签
const playerColorLabel = computed(() => {
    if (gameMode.value === 'pve') {
        return playerColor.value === 'black' ? '你执黑' : '你执白'
    }
    return playerColor.value === 'black' ? '玩家1执黑' : '玩家1执白'
})

// 是否可以悔棋
const canUndo = computed(() => {
    if (history.value.length === 0 || gameOver.value || isAiThinking.value) return false
    if (gameMode.value === 'pve') {
        // 人机模式下至少有两步才能悔棋(玩家+AI各一步)
        return history.value.length >= 2
    }
    return true
})

// 当前玩家是否可以下棋
const canPlayerMove = computed(() => {
    if (gameOver.value || isAiThinking.value) return false
    if (gameMode.value === 'pve') {
        return currentPlayer.value === playerStone.value
    }
    return true
})

// 星位点
const starPoints = computed(() => {
    const points = []
    const positions = [3, 7, 11]
    for (const x of positions) {
        for (const y of positions) {
            points.push({ x, y })
        }
    }
    return points
})

// 获取当前玩家名称
const getCurrentPlayerName = () => {
    if (gameMode.value === 'pve') {
        if (currentPlayer.value === playerStone.value) {
            return currentPlayer.value === 1 ? '黑棋 (你)' : '白棋 (你)'
        } else {
            return currentPlayer.value === 1 ? '黑棋 (AI)' : '白棋 (AI)'
        }
    }
    return currentPlayer.value === 1 ? '黑棋' : '白棋'
}

// 获取胜利者名称
const getWinnerName = () => {
    if (gameMode.value === 'pve') {
        if (winner.value === playerStone.value) {
            return '恭喜你获胜！'
        } else {
            return 'AI 获胜！'
        }
    }
    return `${winner.value === 1 ? '黑棋' : '白棋'}获胜！`
}

// 初始化棋盘
const initBoard = () => {
    board.value = Array(boardSize).fill(null).map(() => Array(boardSize).fill(0))
    currentPlayer.value = 1 // 黑棋总是先手
    gameOver.value = false
    winner.value = 0
    lastMove.value = null
    winningStones.value = []
    history.value = []
    gameTime.value = 0
    isAiThinking.value = false
}

// 开始游戏
const startGame = () => {
    initBoard()
    gameStarted.value = true

    nextTick(() => {
        startTimer()

        // 如果是人机模式且AI先手
        if (gameMode.value === 'pve' && !playerFirst.value) {
            // AI执黑先手
            if (playerColor.value === 'white') {
                setTimeout(() => aiMove(), 500)
            }
        }
        // 如果玩家选择后手但执黑（这种情况下AI执白先下不符合规则，所以交换）
        if (gameMode.value === 'pve' && !playerFirst.value && playerColor.value === 'black') {
            // 玩家执黑但后手，AI执白但要先下，这不符合五子棋规则
            // 实际上应该让玩家执黑先下，或者玩家执白AI先下
            // 这里我们调整：后手时自动让AI下第一步
            setTimeout(() => aiMove(), 500)
        }
    })

    message.success('游戏开始！')
}

// 返回设置界面
const backToSetup = () => {
    stopTimer()
    showWinModal.value = false
    gameStarted.value = false
}

// 计时器
const startTimer = () => {
    stopTimer()
    timer = setInterval(() => {
        gameTime.value++
    }, 1000)
}

const stopTimer = () => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 落子
const makeMove = (x, y) => {
    if (!canPlayerMove.value || board.value[y][x] !== 0) return

    placePiece(x, y, false)

    // 如果游戏没结束且是人机模式，让AI下棋
    if (!gameOver.value && gameMode.value === 'pve') {
        setTimeout(() => aiMove(), 300)
    }
}

// 放置棋子
const placePiece = (x, y, isAi) => {
    board.value[y][x] = currentPlayer.value
    lastMove.value = { x, y }
    history.value.push({ x, y, player: currentPlayer.value, isAi })

    // 检查胜利
    const result = checkWin(x, y)
    if (result) {
        gameOver.value = true
        winner.value = currentPlayer.value
        winningStones.value = result
        stopTimer()

        if (winner.value === 1) {
            scores.value.black++
        } else {
            scores.value.white++
        }

        setTimeout(() => {
            showWinModal.value = true
        }, 500)
        return
    }

    // 检查平局
    if (history.value.length === boardSize * boardSize) {
        gameOver.value = true
        message.info('平局！')
        stopTimer()
        return
    }

    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
}

// AI 下棋
const aiMove = () => {
    if (gameOver.value || currentPlayer.value === playerStone.value) return

    isAiThinking.value = true

    setTimeout(() => {
        const move = findBestMove()
        if (move) {
            placePiece(move.x, move.y, true)
        }
        isAiThinking.value = false
    }, 500)
}

// AI 寻找最佳落子点
const findBestMove = () => {
    const aiPlayer = currentPlayer.value
    const humanPlayer = aiPlayer === 1 ? 2 : 1

    let bestScore = -Infinity
    let bestMove = null
    const candidates = getCandidates()

    if (candidates.length === 0) {
        // 第一步下中心
        return { x: 7, y: 7 }
    }

    for (const { x, y } of candidates) {
        const score = evaluateMove(x, y, aiPlayer, humanPlayer)
        if (score > bestScore) {
            bestScore = score
            bestMove = { x, y }
        }
    }

    return bestMove
}

// 获取候选落子点
const getCandidates = () => {
    const candidates = []
    const visited = new Set()

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (board.value[y][x] !== 0) {
                // 检查周围的空位
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        const nx = x + dx
                        const ny = y + dy
                        const key = `${nx},${ny}`
                        if (
                            nx >= 0 && nx < boardSize &&
                            ny >= 0 && ny < boardSize &&
                            board.value[ny][nx] === 0 &&
                            !visited.has(key)
                        ) {
                            visited.add(key)
                            candidates.push({ x: nx, y: ny })
                        }
                    }
                }
            }
        }
    }

    return candidates
}

// 评估落子分数
const evaluateMove = (x, y, aiPlayer, humanPlayer) => {
    // 根据难度调整权重
    const difficultyWeight = {
        easy: { attack: 1, defense: 0.8 },
        medium: { attack: 1, defense: 1.2 },
        hard: { attack: 1.2, defense: 1.5 }
    }
    const weights = difficultyWeight[aiDifficulty.value]

    // 模拟AI落子评分
    board.value[y][x] = aiPlayer
    const attackScore = evaluatePosition(x, y, aiPlayer) * weights.attack
    board.value[y][x] = 0

    // 模拟玩家落子评分（防守）
    board.value[y][x] = humanPlayer
    const defenseScore = evaluatePosition(x, y, humanPlayer) * weights.defense
    board.value[y][x] = 0

    // 添加随机性（简单模式更随机）
    let randomFactor = 0
    if (aiDifficulty.value === 'easy') {
        randomFactor = Math.random() * 500
    } else if (aiDifficulty.value === 'medium') {
        randomFactor = Math.random() * 100
    }

    return attackScore + defenseScore + randomFactor
}

// 评估位置得分
const evaluatePosition = (x, y, player) => {
    const directions = [
        [1, 0],   // 横
        [0, 1],   // 竖
        [1, 1],   // 斜
        [1, -1],  // 反斜
    ]

    let totalScore = 0

    for (const [dx, dy] of directions) {
        const { count, openEnds } = countLine(x, y, dx, dy, player)
        totalScore += getLineScore(count, openEnds)
    }

    return totalScore
}

// 计算某方向的连子数和开放端
const countLine = (x, y, dx, dy, player) => {
    let count = 1
    let openEnds = 0

    // 正方向
    let blocked = false
    for (let i = 1; i < 5; i++) {
        const nx = x + dx * i
        const ny = y + dy * i
        if (nx < 0 || nx >= boardSize || ny < 0 || ny >= boardSize) {
            blocked = true
            break
        }
        if (board.value[ny][nx] === player) {
            count++
        } else if (board.value[ny][nx] === 0) {
            openEnds++
            break
        } else {
            blocked = true
            break
        }
    }

    // 反方向
    for (let i = 1; i < 5; i++) {
        const nx = x - dx * i
        const ny = y - dy * i
        if (nx < 0 || nx >= boardSize || ny < 0 || ny >= boardSize) {
            break
        }
        if (board.value[ny][nx] === player) {
            count++
        } else if (board.value[ny][nx] === 0) {
            openEnds++
            break
        } else {
            break
        }
    }

    return { count, openEnds }
}

// 根据连子数和开放端计算得分
const getLineScore = (count, openEnds) => {
    if (count >= 5) return 100000      // 五连
    if (count === 4) {
        if (openEnds >= 2) return 10000  // 活四
        if (openEnds === 1) return 1000  // 冲四
    }
    if (count === 3) {
        if (openEnds >= 2) return 1000   // 活三
        if (openEnds === 1) return 100   // 眠三
    }
    if (count === 2) {
        if (openEnds >= 2) return 100    // 活二
        if (openEnds === 1) return 10    // 眠二
    }
    if (count === 1 && openEnds >= 2) return 10
    return 0
}

// 检查胜利
const checkWin = (x, y) => {
    const player = board.value[y][x]
    const directions = [
        [1, 0],   // 横
        [0, 1],   // 竖
        [1, 1],   // 斜
        [1, -1],  // 反斜
    ]

    for (const [dx, dy] of directions) {
        const stones = [{ x, y }]

        // 正方向
        for (let i = 1; i < 5; i++) {
            const nx = x + dx * i
            const ny = y + dy * i
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board.value[ny][nx] === player) {
                stones.push({ x: nx, y: ny })
            } else {
                break
            }
        }

        // 反方向
        for (let i = 1; i < 5; i++) {
            const nx = x - dx * i
            const ny = y - dy * i
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board.value[ny][nx] === player) {
                stones.push({ x: nx, y: ny })
            } else {
                break
            }
        }

        if (stones.length >= 5) {
            return stones
        }
    }

    return null
}

// 判断是否为获胜棋子
const isWinningStone = (x, y) => {
    return winningStones.value.some(s => s.x === x && s.y === y)
}

// 悔棋
const undoMove = () => {
    if (!canUndo.value) return

    if (gameMode.value === 'pve') {
        // 人机模式下悔两步（玩家+AI）
        for (let i = 0; i < 2 && history.value.length > 0; i++) {
            const lastMoveRecord = history.value.pop()
            board.value[lastMoveRecord.y][lastMoveRecord.x] = 0
        }
        currentPlayer.value = playerStone.value
    } else {
        const lastMoveRecord = history.value.pop()
        board.value[lastMoveRecord.y][lastMoveRecord.x] = 0
        currentPlayer.value = lastMoveRecord.player
    }

    if (history.value.length > 0) {
        const prevMove = history.value[history.value.length - 1]
        lastMove.value = { x: prevMove.x, y: prevMove.y }
    } else {
        lastMove.value = null
    }

    message.success('已悔棋')
}

// 重新开始
const restartGame = () => {
    showWinModal.value = false
    initBoard()
    startTimer()

    // 如果是人机模式且AI先手
    if (gameMode.value === 'pve' && !playerFirst.value) {
        setTimeout(() => aiMove(), 500)
    }

    message.success('新游戏开始！')
}

onMounted(() => {
    initBoard()
})

onUnmounted(() => {
    stopTimer()
})
</script>

<style scoped>
.game-container {
    padding: 24px;
    background-color: rgb(16, 16, 20);
}

.game-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

/* ==================== 设置界面样式 ==================== */
.setup-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
}

.setup-container {
    width: 100%;
    max-width: 500px;
}

.setup-header {
    text-align: center;
    margin-bottom: 32px;
}

.setup-title {
    font-size: 48px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    letter-spacing: 4px;
}

.setup-subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin-top: 8px;
    letter-spacing: 2px;
}

.setup-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 8px;
}

.setup-section {
    margin-bottom: 28px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 16px;
}

/* 模式选择器 */
.mode-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.mode-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.mode-option:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.1);
}

.mode-option.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.mode-option.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.mode-icon {
    color: rgba(255, 255, 255, 0.7);
}

.mode-option.active .mode-icon {
    color: #10b981;
}

.mode-label {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
}

.mode-desc {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
}

.coming-soon {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 10px;
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.5);
}

/* 颜色选择器 */
.color-selector {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.color-option {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.color-option:hover {
    background: rgba(255, 255, 255, 0.1);
}

.color-option.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.stone-preview {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.stone-preview.black {
    background: radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 50%, #000 100%);
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5);
}

.stone-preview.white {
    background: radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 50%, #d9d9d9 100%);
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.3);
}

.color-label {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

/* 先后手选择器 */
.order-selector {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.order-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.order-option:hover {
    background: rgba(255, 255, 255, 0.1);
}

.order-option.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.order-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
}

.order-icon.first {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.order-icon.second {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
}

.order-label {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
}

.order-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
}

/* 难度选择器 */
.difficulty-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.difficulty-option {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.difficulty-option:hover {
    background: rgba(255, 255, 255, 0.1);
}

.difficulty-option.active {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.difficulty-label {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
}

.start-button {
    margin-top: 8px;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
}

/* 历史比分 */
.history-scores {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
}

.history-scores .score-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.history-scores .score-value {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
}

.history-scores .score-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.score-divider {
    color: rgba(255, 255, 255, 0.2);
}

/* ==================== 游戏界面样式 ==================== */
.game-screen {
    width: 100%;
}

.header {
    text-align: center;
    margin-bottom: 32px;
}

.title {
    font-size: 42px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    letter-spacing: 4px;
}

.title-icon {
    font-size: 24px;
    color: #1a1a1a;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.title-icon.white {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin-top: 8px;
    letter-spacing: 2px;
}

.game-content {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    justify-content: center;
}

/* 信息面板 */
.info-panel {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.status-card,
.stats-card,
.score-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
}

.current-player {
    display: flex;
    align-items: center;
    gap: 16px;
}

.player-indicator {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.player-indicator.black {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.player-indicator.white {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.player-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.player-info .label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.player-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

.thinking-indicator {
    display: inline-block;
    font-size: 12px;
    color: #10b981;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

.stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    color: #10b981;
}

.stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
}

.score-board {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.score {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
}

.score-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
}

.score-vs {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.3);
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* 棋盘 */
.board-container {
    position: relative;
}

.board {
    position: relative;
    background: linear-gradient(145deg, #dcb35c 0%, #c9a227 50%, #b8960f 100%);
    border-radius: 12px;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5),
        inset 0 2px 4px rgba(255, 255, 255, 0.3),
        inset 0 -2px 4px rgba(0, 0, 0, 0.2);
    padding: 8px;
}

.board-grid {
    position: absolute;
    top: 8px;
    left: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    pointer-events: none;
}

.grid-line {
    stroke: rgba(0, 0, 0, 0.4);
    stroke-width: 1;
}

.star-point {
    fill: rgba(0, 0, 0, 0.5);
}

.stones-layer {
    position: relative;
    z-index: 1;
}

.board-row {
    display: flex;
}

.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
}

/* 棋子样式 */
.stone {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: relative;
    transition: transform 0.2s ease;
}

.stone.black {
    background: radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 50%, #000 100%);
    box-shadow:
        2px 3px 8px rgba(0, 0, 0, 0.5),
        inset -2px -2px 6px rgba(255, 255, 255, 0.1);
}

.stone.white {
    background: radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 50%, #d9d9d9 100%);
    box-shadow:
        2px 3px 8px rgba(0, 0, 0, 0.3),
        inset -2px -2px 6px rgba(0, 0, 0, 0.05);
}

.stone.preview {
    opacity: 0.5;
    transform: scale(0.9);
}

.stone.last-move {
    animation: pulse 2s infinite;
}

.stone.winning {
    animation: winning-glow 0.5s ease infinite alternate;
}

.last-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
}

.stone.white .last-indicator {
    background: #059669;
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5);
    }

    50% {
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.5);
    }
}

@keyframes winning-glow {
    from {
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5), 0 0 10px rgba(16, 185, 129, 0.8);
    }

    to {
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.5), 0 0 25px rgba(16, 185, 129, 1);
    }
}

/* 落子动画 */
.stone-drop-enter-active {
    animation: stone-drop 0.3s ease-out;
}

@keyframes stone-drop {
    0% {
        transform: scale(0) translateY(-20px);
        opacity: 0;
    }

    60% {
        transform: scale(1.1) translateY(0);
    }

    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

/* 历史记录面板 */
.history-panel {
    width: 180px;
}

.history-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
}

.history-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
}

.history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.history-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;
}

.history-item.last {
    background: rgba(16, 185, 129, 0.2);
}

.move-number {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    min-width: 24px;
}

.stone-mini {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.stone-mini.black {
    background: radial-gradient(circle at 30% 30%, #4a4a4a 0%, #1a1a1a 50%, #000 100%);
}

.stone-mini.white {
    background: radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 50%, #d9d9d9 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.move-pos {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    font-family: monospace;
}

.move-who {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    margin-left: auto;
}

.empty-history {
    text-align: center;
    color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
    padding: 20px;
}

/* 胜利弹窗 */
.win-modal {
    text-align: center;
    padding: 24px 0;
}

.win-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    background: rgba(255, 255, 255, 0.1);
}

.win-icon.black {
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
}

.win-icon.white {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

.stone.large {
    width: 50px;
    height: 50px;
}

.win-title {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
}

.win-stats {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 24px;
}

.win-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
}

/* 响应式 */
@media (max-width: 900px) {
    .game-content {
        flex-direction: column;
        align-items: center;
    }

    .info-panel,
    .history-panel {
        width: 100%;
        max-width: 400px;
    }

    .info-panel {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
    }

    .status-card,
    .stats-card,
    .score-card {
        flex: 1;
        min-width: 150px;
    }

    .action-buttons {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    .action-buttons .n-button {
        flex: 1;
        min-width: 120px;
    }

    .history-panel {
        order: 3;
    }

    .mode-selector {
        grid-template-columns: 1fr;
    }
}
</style>
