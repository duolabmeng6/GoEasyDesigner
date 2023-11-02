<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="公用属性" :item="item"/>
      <el-form-item label="现行选中项">
        <el-input v-model="props.item.现行选中项"/>
      </el-form-item>
      <el-form-item label="布局方式">
        <el-select v-model="props.item.布局方式" style="width: 100%">
          <el-option
              v-for="(item, index) in 布局方式选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

    </el-form>
  </div>
  <component is="公用事件组件" :item="props.item" :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

import {Delete} from "@element-plus/icons-vue";

import {useAppStore} from '@/stores/appStore'

const store = useAppStore()


let 布局方式选项 = ref([
  {"label": "header-main", "value": "header-main"},
  {"label": "header-main-footer", "value": "header-main-footer"},
  {"label": "aside-main", "value": "aside-main"},
  {"label": "header-aside-main", "value": "header-aside-main"},
  {"label": "header-aside-main-footer", "value": "header-aside-main-footer"},
  {"label": "aside-header-main", "value": "aside-header-main"},
  {"label": "aside-header-main-footer", "value": "aside-header-main-footer"},
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

</script>