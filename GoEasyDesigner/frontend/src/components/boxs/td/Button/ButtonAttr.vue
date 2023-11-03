<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item"/>
      <el-form-item label="text">
        <el-input v-model="props.item.text"/>
      </el-form-item>
      <el-form-item label="block">
        <el-switch v-model="item.block"/>
      </el-form-item>
      <el-form-item label="ghost">
        <el-switch v-model="item.ghost"/>
      </el-form-item>
      <el-form-item label="loading">
        <el-switch v-model="item.loading"/>
      </el-form-item>
      <el-form-item label="shape">
        <el-select v-model="props.item.shape" style="width: 100%">
          <el-option
              v-for="(item, index) in shapeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
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

      <el-form-item label="theme">
        <el-select v-model="props.item.theme" style="width: 100%">
          <el-option
              v-for="(item, index) in themeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="variant">
        <el-select v-model="props.item.variant" style="width: 100%">
          <el-option
              v-for="(item, index) in variantOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

    </el-form>
  </div>


    <component is="公用事件组件" :item="props.item"  :事件名称="enventNames"/>

</template>
<script setup>
import {ref, defineProps, defineEmits,onMounted} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let shapeOptions = ref([
  {"label": "长方形", "value": "rectangle"},
  {"label": "正方形", "value": "square"},
  {"label": "圆角长方形", "value": "round"},
  {"label": "圆形", "value": "circle"},
]);

let sizeOptions = ref([
  {"label": "更小", "value": "extra-small"},
  {"label": "小", "value": "small"},
  {"label": "中", "value": "medium"},
  {"label": "大", "value": "large"},
]);
let themeOptions = ref([
  {"label": "默认", "value": "default"},
  {"label": "主要", "value": "primary"},
  {"label": "危险", "value": "danger"},
  {"label": "警告", "value": "warning"},
  {"label": "成功", "value": "success"},
]);

let variantOptions = ref([
  {"label": "基础", "value": "base"},
  {"label": "线框", "value": "outline"},
  {"label": "虚线", "value": "dashed"},
  {"label": "文字", "value": "text"},
]);

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


onMounted(() => {
  console.log("ButtonAttr.vue onMounted");
  console.log("--",localStorage.getItem("locale") );

  if (localStorage.getItem("locale") === "English") {
    console.log("英语");
    shapeOptions.value.forEach((item) => {
      item.label = item.value;
    });
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
    themeOptions.value.forEach((item) => {
      item.label = item.value;
    });
    variantOptions.value.forEach((item) => {
      item.label = item.value;
    });

  }

});



</script>