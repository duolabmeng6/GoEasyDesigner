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
    <component is="公用事件组件" :item="item" :事件名称="事件名称"/>
  </teleport>
</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const {item} = defineProps(['item']);

let 事件名称 = ref([
  {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  {"label": "被单击", "value": "被单击"},
  {"label": "鼠标左键被按下", "value": "鼠标左键被按下"},
  {"label": "鼠标左键被放开", "value": "鼠标左键被放开"},
  {"label": "被双击", "value": "被双击"},
  {"label": "鼠标右键被按下", "value": "鼠标右键被按下"},
  {"label": "鼠标右键被放开", "value": "鼠标右键被放开"},
  {"label": "鼠标位置被移动", "value": "鼠标位置被移动"},
  {"label": "获得焦点", "value": "获得焦点"},
  {"label": "失去焦点", "value": "失去焦点"},
  {"label": "按下某键", "value": "按下某键"},
  {"label": "放开某键", "value": "放开某键"},
  {"label": "滚轮被滚动", "value": "滚轮被滚动"}
])
</script>

