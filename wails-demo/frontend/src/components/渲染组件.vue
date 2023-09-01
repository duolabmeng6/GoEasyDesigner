<template>
  <div
      :style="getItemStyle(item)"
      style="position: absolute"
  >
    <div
        :id="item.名称"
        class="子组件"
        @click.stop="store.组件点击($event,item)"
        v-show="item.可视"
        :class="{ 'disabled': item.禁用 }"
    >

        <component :is="item.组件名称" :item="item"/>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
const {item} = defineProps(['item']);
import {引入窗口数据} from '@/窗口/窗口数据'
import {getItemStyle} from "@/public";

const store = 引入窗口数据()


</script>

<style>

.子组件 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.el-tabs {
  overflow: visible !important;
  width: auto !important;
}


.disabled {
  pointer-events: none;
  opacity: 0.6; /* 可选：降低透明度来表示禁用状态 */
}
</style>