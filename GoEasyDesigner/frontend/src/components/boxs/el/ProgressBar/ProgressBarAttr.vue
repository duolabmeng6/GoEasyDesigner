<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="common-properties" :item="item"/>

      <el-form-item label="n">
        <el-input-number  v-model="props.item.n"/>
      </el-form-item>
      <el-form-item label="min">
        <el-input-number  v-model="props.item.min"/>
      </el-form-item>
      <el-form-item label="max">
        <el-input-number  v-model="props.item.max"/>
      </el-form-item>
      <el-form-item label="step">
        <el-input-number  v-model="props.item.step"/>
      </el-form-item>
      <el-form-item label="size">
        <el-select v-model="props.item.size" style="width: 100%">
          <el-option
              v-for="(item, index) in sizeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>


    </el-form>
  </div>

  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>

</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

let sizeOptions = ref([
  {"label": "自定义", "value": "custom"},
  {"label": "默认", "value": "default"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);


let eventName = ref([

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

onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
  }
});

</script>