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
      <el-form-item label="描述">
        <el-input v-model="props.item.描述"/>
      </el-form-item>

      <el-form-item label="文字居中">
        <el-switch v-model="item.文字居中"/>
      </el-form-item>
      <el-form-item label="可否关闭">
        <el-switch v-model="item.可否关闭"/>
      </el-form-item>

      <el-form-item label="提示类型">
        <el-select v-model="props.item.提示类型" style="width: 100%">
          <el-option
              v-for="(item, index) in 提示类型选项"
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
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let 提示类型选项 = ref([
  {"label": "成功", "value": "success"},
  {"label": "信息", "value": "info"},
  {"label": "警告", "value": "warning"},
  {"label": "错误", "value": "error"},
]);


let 事件名称 = ref([

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