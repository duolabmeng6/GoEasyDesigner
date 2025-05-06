<template>
    <div v-show="modelValue" class="fixed inset-0 z-[9999]">
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/30" @click="handleClose"></div>

        <!-- Windows 10 风格对话框 -->
        <div class="absolute bg-white rounded-lg shadow-xl flex flex-col" :style="dialogStyle" ref="dialogRef">
            <!-- 标题栏 -->
            <div class="flex items-center justify-between h-10 px-4 bg-[#2b579a] text-white rounded-t-lg select-none cursor-move"
                @mousedown="startDrag">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-window-maximize text-sm"></i>
                    <span class="text-sm font-medium">{{ $t('app.preview') }}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button @click.stop="handleMinimize" class="p-2 hover:bg-blue-700 transition-colors">
                        <i class="fas fa-window-minimize text-sm"></i>
                    </button>
                    <button @click.stop="handleMaximize" class="p-2 hover:bg-blue-700 transition-colors">
                        <i class="fas" :class="isMaximized ? 'fa-window-restore' : 'fa-window-maximize'"></i>
                    </button>
                    <button @click.stop="handleClose" class="p-2 transition-colors rounded">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="overflow-hidden" :style="contentStyle">
                <component is="RenderDesignComponentWin" v-for="(item, index) in store.list" :key="index" :item="item" />
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="/font-awesome.css" />
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/appStore'

const store = useAppStore()

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
const dialogRef = ref(null)
const isMaximized = ref(false)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const width = ref(store.list[0].width)
const height = ref(store.list[0].height)

// 计算对话框样式
const dialogStyle = computed(() => {
    if (isMaximized.value) {
        return {
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            transform: 'none'
        }
    }

    return {
        width: width.value + 'px',
        height: height.value + 'px',
        top: `${position.value.y}px`,
        left: `${position.value.x}px`,
        transform: isDragging.value ? 'none' : undefined
    }
})

const contentStyle = computed(() => {
    //如果包含了%或者v或者auto那么就转换成px
    if (typeof height.value === 'string' && (height.value.includes('%') || height.value.includes('v') || height.value === 'auto')) {
        height.value = 600
    }
    if (typeof width.value === 'string' && (width.value.includes('%') || width.value.includes('v') || width.value === 'auto')) {
        width.value = 800
    }

    return {
        height: height.value+"px",
        width: width.value+"px",
        position: "relative"
    }
})

// 关闭窗口
const handleClose = () => {
    emit('update:modelValue', false)
}

// 最小化窗口
const handleMinimize = () => {
    const dialog = dialogRef.value
    dialog.style.transform = 'scale(0.1) translateY(1000px)'
    dialog.style.opacity = '0'
    setTimeout(() => {
        dialog.style.transform = ''
        dialog.style.opacity = ''
        emit('update:modelValue', false)
    }, 300)
}

// 最大化/还原窗口
const handleMaximize = () => {
    if (!isMaximized.value) {
        position.value = {
            x: dialogRef.value.offsetLeft,
            y: dialogRef.value.offsetTop
        }
    }
    isMaximized.value = !isMaximized.value
}

// 开始拖拽
const startDrag = (e) => {
    if (isMaximized.value || e.target.closest('button')) return

    isDragging.value = true
    const rect = dialogRef.value.getBoundingClientRect()
    dragOffset.value = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }

    document.body.style.cursor = 'move'
    e.preventDefault()
}

// 拖拽中
const drag = (e) => {
    if (!isDragging.value) return

    e.preventDefault()

    const newX = e.clientX - dragOffset.value.x
    const newY = e.clientY - dragOffset.value.y

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const dialogWidth = dialogRef.value.offsetWidth
    const dialogHeight = dialogRef.value.offsetHeight

    const maxX = windowWidth - Math.min(dialogWidth, 10)
    const maxY = windowHeight - Math.min(dialogHeight, 10)

    position.value = {
        x: Math.min(Math.max(-10, newX), maxX),
        y: Math.min(Math.max(-10, newY), maxY)
    }
}

// 结束拖拽
const stopDrag = () => {
    isDragging.value = false
    document.body.style.cursor = ''
}

// 监听全局事件
onMounted(() => {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)

    // 初始位置居中
    if (dialogRef.value) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const dialogWidth = dialogRef.value.offsetWidth
        const dialogHeight = dialogRef.value.offsetHeight

        position.value = {
            x: (windowWidth - dialogWidth) / 2,
            y: (windowHeight - dialogHeight) / 2
        }
    }

    width.value = store.list[0].width
    height.value = store.list[0].height
})

onUnmounted(() => {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.absolute {
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.2s ease, height 0.2s ease;
    will-change: transform, opacity, width, height, top, left;
}

.absolute:not([style*="transform: none"]) {
    transition: none;
}

/* 禁用按钮拖动时的文本选择 */
button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
}

button:hover {
    opacity: 0.9;
}

button:active {
    opacity: 0.7;
}

/* 内容区域滚动条样式 */
.overflow-auto::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>