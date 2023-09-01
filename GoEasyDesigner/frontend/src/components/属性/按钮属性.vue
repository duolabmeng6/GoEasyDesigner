<template>
  <div class="属性表格">
    <el-form
        label-position="left"
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
  <div class="添加组件事件">
    <el-select v-model="事件索引"
               class="m-2"
               placeholder="Select"
               size="large"
               @change="handleSelectChange"
               style="width: 100%">
      <el-option
          v-for="(item, index) in 事件名称"
          :key="index"
          :label="item"
          :value="index"
      />
    </el-select>
  </div>

</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

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


let 事件索引 = ref(0)

let 事件名称 = ref([
  "在此处选择加入事件处理函数",
  '被单击',
  '鼠标左键被按下',
  '鼠标左键被放开',
  '被双击',
  '鼠标右键被按下',
  '鼠标右键被放开',
  '鼠标位置被移动',
  "获得焦点",
  "获得焦点",
  "获得焦点",
  "按下某键",
  "放开某键",
  "滚轮被滚动",
])

const handleSelectChange = function () {
  let a = 事件索引.value
  const Name = 事件名称.value[a];
  console.log('添加事件被选择', Name + props.item.名称);
  事件索引.value = 0
  emits("添加事件被选择", Name, props.item);
}
</script>