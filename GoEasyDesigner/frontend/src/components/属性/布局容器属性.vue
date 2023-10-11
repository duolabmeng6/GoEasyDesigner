<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="公用属性" :item="item"/>

      <el-form-item label="占比" v-if="props.item.占比>=0">
        <el-input-number v-model="props.item.占比" max="24" min="0"/>
      </el-form-item>
    </el-form>
  </div>
  <component is="公用事件组件" :item="props.item"  :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);


let 事件索引 = ref(0)

let 事件名称 = ref([
  {"label": "在此处选择加入事件处理函数", "value": "在此处选择加入事件处理函数"},
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


const handleSelectChange = function () {
  let a = 事件索引.value
  const Name = 事件名称.value[a];
  console.log('添加事件被选择', Name + props.item.名称);
  事件索引.value = 0
  emits("添加事件被选择", Name, props.item);
}
</script>