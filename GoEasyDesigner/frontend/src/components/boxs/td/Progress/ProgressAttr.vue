<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item" />

      <el-form-item label="color">
        <el-color-picker v-model="props.item.color" show-alpha
                         @active-change="val => props.item.color = val"/>
      </el-form-item>
      <el-form-item label="label">
        <el-switch v-model="item.label" />
      </el-form-item>
      <el-form-item label="percentage">
        <el-input v-model="item.percentage" />
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
      <el-form-item label="status">
        <el-select v-model="item.status" style="width: 100%">
          <el-option
              v-for="statusOption in statusOptions"
              :key="statusOption.value"
              :label="statusOption.label"
              :value="statusOption.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="strokeWidth">
        <el-input v-model="item.strokeWidth" />
      </el-form-item>
      <el-form-item label="theme">
        <el-select v-model="item.theme" style="width: 100%">
          <el-option
              v-for="themeOption in themeOptions"
              :key="themeOption.value"
              :label="themeOption.label"
              :value="themeOption.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="trackColor">
        <el-color-picker v-model="props.item.trackColor" show-alpha
                         @active-change="val => props.item.trackColor = val"/>
      </el-form-item>
    </el-form>
  </div>
  <component
      is="common-event-component"
      :item="item"
      :eventName="eventNames"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const emits = defineEmits(["添加事件被选择"]);
const props = defineProps(["item"]);
let statusOptions = ref([
  { label: "成功", value: "success" },
  { label: "错误", value: "error" },
  { label: "警告", value: "warning" },
  { label: "活动", value: "active" },
]);
let themeOptions = ref([
  { label: "线形", value: "line" },
  { label: "厚实", value: "plump" },
  { label: "圆形", value: "circle" },
]);
let sizeOptions = ref([
  { label: "小", value: "small" },
  { label: "中", value: "medium" },
  { label: "大", value: "large" },
]);

let eventNames = ref([
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
    statusOptions.value.forEach((item) => {
      item.label = item.value;
    });
    themeOptions.value.forEach((item) => {
      item.label = item.value;
    });
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
  }
});
</script>
