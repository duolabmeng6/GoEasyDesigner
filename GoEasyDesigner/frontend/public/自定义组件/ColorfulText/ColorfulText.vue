<template>
  <div class="relative h-[100%] w-[100%] overflow-hidden rounded-xl">
    <span 
      class="all-gpts inherited-styles-for-exported-element"
      v-html="item.data.title"
      :style="{ fontSize: item.fontSize }"
    ></span>
  </div>
</template>

<style scoped>
@keyframes text-gradient {
  0% { background-position: 0 0; }
  100% { background-position: 200% 0; }
}

*,
::after,
::before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}

.inherited-styles-for-exported-element {
  cursor: default;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: transparent;  /* 保留透明色实现渐变文字 */
  -webkit-background-clip: text;  /* 添加webkit前缀 */
  background-clip: text;  /* 标准属性 */
}

.all-gpts {
  animation: text-gradient 2s linear infinite;
  background-image: 
    linear-gradient(90deg, #fb7185, #d946ef, #6366f1, #d946ef, #fb7185),
    linear-gradient(90deg, #fb7185, #d946ef, #6366f1, #d946ef, #fb7185);
  background-size: 200% 100%;
}

/* 滚动条样式 */
* ::-webkit-scrollbar {
  width: 10px;
}
* ::-webkit-scrollbar-track {
  background-color: #fff;
}
* ::-webkit-scrollbar-thumb {
  background-color: #ddd6fe;
}
* ::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 响应式调整 */
@media (min-width: 768px) {
  .inherited-styles-for-exported-element {
    text-align: center;
  }
}
</style>

<script setup>
import { defineEmits, defineProps } from "vue";

const { item } = defineProps(['item']);
const emits = defineEmits(["CustomEvent"]);

function onSendEvent(name, data) {
  emits("CustomEvent", name, data);
}
</script>