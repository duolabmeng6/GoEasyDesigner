<template>
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <el-form-item label="标题">
      <el-input v-model="item.data.title"/>
    </el-form-item>
  </el-form>
  <teleport to="#事件选择器">
    <component is="common-event-component" :item="item" :事件名称="事件名称"/>
  </teleport>
</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const {item} = defineProps(['item']);

let 事件名称 = ref([
  {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  {"label": "被单击", "value": "click"},
  {"label": "鼠标左键被按下", "value": "mousedown"},
  {"label": "鼠标左键被放开", "value": "mouseup"},
  {"label": "被双击", "value": "dblclick"},
  {"label": "鼠标右键被按下", "value": "contextmenu"},
  {"label": "鼠标位置被移动", "value": "mousemove"},
  {"label": "获得焦点", "value": "focus"},
  {"label": "失去焦点", "value": "blur"},
  {"label": "按下某键", "value": "keydown"},
  {"label": "放开某键", "value": "keyup"},
  {"label": "滚轮被滚动", "value": "mousewheel"}
])
</script>

