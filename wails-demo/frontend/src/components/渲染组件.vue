<template>
  <div
      :style="getItemStyleShape(item)"
  >
    <div
        v-show="item.可视"
        :id="item.名称"
        v-demo="item"
        :class="{ 'disabled': item.禁用 }"
        class="子组件"
    >
      <template v-if="item.组件名称=='按钮'">
        <component is="按钮" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='布局容器'">
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>
      </template>
      <template v-else-if="item.组件名称=='选择夹'">
        <component is="选择夹" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='常用布局'">
        <component is="常用布局" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='弹性布局'">
        <component is="弹性布局" :item="item"/>
      </template>
      <template v-else>
        <component :is="item.组件名称" :item="item"/>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const {item} = defineProps(['item']);
import {引入窗口数据} from '@/窗口/窗口数据'
import {getItemStyleShape} from "@/public";

const store = 引入窗口数据()
const vDemo = {
  mounted: (el, binding) => {
    // console.log(binding.value) // => "hello!"
    let item = binding.value
    let 事件列表 = {
      "click": "被单击",
      "mousedown": "鼠标左键被按下",
      "mouseup": "鼠标左键被放开",
      "dblclick": "被双击",
      "contextmenu": "鼠标右键被按下",
      "mousemove": "鼠标位置被移动",
      "focus": "获得焦点",
      "blur": "失去焦点",
      "keydown": "按下某键",
      "keyup": "放开某键",
      "mousewheel": "滚轮被滚动"
    }
    for (let 事件 in 事件列表) {
      if (item.hasOwnProperty("事件" + 事件列表[事件])) {
        console.log("存在", "事件" + 事件列表[事件])
        el.addEventListener(事件, function (e) {
          store.handleAllEvents(el, e, binding.value)
        });
      }
    }
    // if (item.hasOwnProperty(`事件被单击`)) {
    //   console.log("存在","事件被单击")
    //   el.addEventListener('click', (e) => {
    //     store.handleAllEvents(e,binding.value)
    //   });
    // }
  }
}
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