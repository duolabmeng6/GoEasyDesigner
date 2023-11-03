<template>
  <div class="属性表格">

  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <component is="common-properties" :item="item"/>
    <el-form-item label="内容">
      <el-input v-model="itemtext"/>
    </el-form-item>
    <el-form-item label="size">
      <el-select v-model="props.item.size" style="width: 100%">
        <el-option
            v-for="(item, index) in size选项"
            :key="item"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="maxlength">
      <el-input v-model="item.maxlength"/>
    </el-form-item>
    <el-form-item label="placeholder">
      <el-input v-model="item.placeholder"/>
    </el-form-item>

    <el-form-item label="type">
      <el-select v-model="props.item.type" style="width: 100%">
        <el-option
            v-for="(item, index) in type选项"
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
let size选项 = ref([
  {"label": "自定义", "value": "custom"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);
let type选项 = ref([
  {"label": "单行文本框", "value": "text"},
  {"label": "多行文本框", "value": "textarea"},
  {"label": "密码输入框", "value": "password"},
  {"label": "数字输入框", "value": "number"},
]);
onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    size选项.value.forEach((item) => {
      item.label = item.value;
    });
    type选项.value.forEach((item) => {
      item.label = item.value;
    });
  }
});


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
</script>

