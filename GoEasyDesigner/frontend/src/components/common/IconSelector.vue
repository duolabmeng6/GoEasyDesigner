<template>
  <div class="icon-selector">
    
    <el-popover
        placement="bottom"
        :width="800"
        trigger="click"
        v-model:visible="popoverVisible"
    >
      <template #reference>
        <el-input
            v-model="props.modelValue"
            :placeholder="placeholder"
            clearable
            @clear="handleClear"
        >
          <template #prefix v-if="props.modelValue">
            <i :class="props.modelValue"></i>
          </template>
          <template #append>
            <el-button>
              <i class="fa fa-search"></i>
            </el-button>
          </template>
        </el-input>
      </template>
      
      <div class="icon-list">
        <el-input
            v-model="searchText"
            placeholder="搜索图标"
            clearable
            style="margin-bottom: 10px"
        >
          <template #prefix>
            <i class="fa fa-search"></i>
          </template>
        </el-input>
        
        <div class="icons-container" ref="containerRef">
          <div
              class="icons-content"
              :style="{ height: totalHeight + 'px', position: 'relative' }"
          >
            <div
                class="icons-visible"
                :style="{
                  transform: `translateY(${startOffset}px)`,
                  position: 'absolute',
                  width: '100%'
                }"
            >
              <div
                  v-for="icon in visibleIcons"
                  :key="icon"
                  class="icon-item"
                  @click="selectIcon(icon)"
              >
                <i :class="icon"></i>
                <span class="icon-name">{{ formatIconName(icon) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import iconNames from '@/components/boxs/el/TabsTW/fontawesome_free_icon_names.js'
import { debounce } from 'lodash-es'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '选择图标'
  }
})

const emit = defineEmits(['update:modelValue'])
const searchText = ref('')
const allIcons = ref([])
const popoverVisible = ref(false)
const containerRef = ref(null)

// 虚拟滚动相关参数
const itemHeight = 80 // 每个图标项的高度
const visibleCount = 40 // 可视区域显示的图标数量
const bufferCount = 10 // 上下缓冲的图标数量
const scrollTop = ref(0)

// 计算总高度
const totalHeight = computed(() => {
  return filteredIcons.value.length * itemHeight
})

// 计算起始偏移量
const startOffset = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight)
  return start * itemHeight
})

// 计算当前可见的图标
const visibleIcons = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight)
  const startIndex = Math.max(0, start - bufferCount)
  const endIndex = Math.min(
    filteredIcons.value.length,
    start + visibleCount + bufferCount
  )
  return filteredIcons.value.slice(startIndex, endIndex)
})

// 处理滚动事件
const handleScroll = debounce(() => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
}, 16)

// 在组件挂载时获取所有图标并添加滚动监听
onMounted(() => {
  allIcons.value = iconNames
  console.log('发现图标数量:', allIcons.value.length)
  
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll)
  }
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll)
  }
})

// 优化的搜索过滤逻辑
const filteredIcons = computed(() => {
  if (!searchText.value) return allIcons.value
  const searchLower = searchText.value.toLowerCase()
  return allIcons.value.filter(icon => 
    icon.toLowerCase().includes(searchLower)
  )
})

// 选择图标
const selectIcon = (iconName) => {
  emit('update:modelValue', iconName)
  popoverVisible.value = false
}

// 清除选择
const handleClear = () => {
  emit('update:modelValue', '')
  popoverVisible.value = false
}

// 在 script setup 部分添加 formatIconName 方法
const formatIconName = (iconName) => {
  // 移除所有 fa- 开头的前缀
  return iconName.split(' ').pop().replace(/^fa-/, '')
}
</script>

<style scoped>
.icon-list {
  max-height: 400px;
  overflow: hidden;
  padding: 10px;
}

.icons-container {
  height: 400px;
  overflow-y: auto;
  position: relative;
}

.icons-content {
  position: relative;
}

.icons-visible {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  text-align: center;
  border: 1px solid transparent;
}

.icon-item:hover {
  background-color: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-7);
}

.icon-name {
  font-size: 12px;
  margin-top: 8px;
  color: var(--el-text-color-secondary);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
}

.icon-item i {
  font-size: 24px;
  color: var(--el-text-color-primary);
}

.el-input i.fa {
  font-size: 14px;
}

/* 添加滚动条样式 */
.icon-list::-webkit-scrollbar {
  width: 6px;
}

.icon-list::-webkit-scrollbar-thumb {
  background-color: var(--el-border-color-lighter);
  border-radius: 3px;
}

.icon-list::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 响应式布局调整 */
@media screen and (max-width: 768px) {
  .icons-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }

  .icon-item {
    padding: 8px 4px;
  }

  .icon-item i {
    font-size: 20px;
  }
}
</style> 