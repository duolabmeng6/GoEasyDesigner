<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="td公用属性" :item="item"/>

    </el-form>
  </div>


    <component is="公用事件组件" :item="props.item"  :事件名称="enventNames"/>

</template>
<script setup>
import {ref, defineProps, defineEmits,onMounted} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

let enventNames = ref([
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