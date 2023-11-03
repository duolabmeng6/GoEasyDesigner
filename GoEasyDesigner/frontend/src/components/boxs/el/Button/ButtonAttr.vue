<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="公用属性" :item="item"/>

      <el-form-item label="标题">
        <el-input v-model="props.item.标题"/>
      </el-form-item>
      <el-form-item label="按钮类型">
        <el-select v-model="props.item.按钮类型" style="width: 100%">
          <el-option
              v-for="(item, index) in 按钮类型选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="props.item.尺寸" style="width: 100%">
          <el-option
              v-for="(item, index) in 尺寸选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>


    <component is="公用事件组件" :item="props.item"  :事件名称="事件名称"/>

</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let 按钮类型选项 = ref([
  {"label": "默认", "value": "default"},
  {"label": "主要", "value": "primary"},
  {"label": "成功", "value": "success"},
  {"label": "信息", "value": "info"},
  {"label": "警告", "value": "warning"},
  {"label": "危险", "value": "danger"},
]);

let 尺寸选项 = ref([
  {"label": "自定义", "value": "custom"},
  {"label": "默认", "value": "default"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);


let 事件名称 = ref([
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
  console.log("ButtonAttr.vue onMounted");
  console.log("--",localStorage.getItem("locale") );

  if (localStorage.getItem("locale") === "English") {
    console.log("英语");
    按钮类型选项.value.forEach((item) => {
      item.label = item.value;
    });
    尺寸选项.value.forEach((item) => {
      item.label = item.value;
    });

  }

});



</script>