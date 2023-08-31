<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        style="max-width: 460px"
    >
      <el-form-item label="名称">
        <el-input v-model="props.item.名称"/>
      </el-form-item>
      <el-form-item label="顶边">
        <el-input v-model="props.item.top"/>
      </el-form-item>
      <el-form-item label="左边">
        <el-input v-model="props.item.left"/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="props.item.width"/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="props.item.height"/>
      </el-form-item>
      <el-form-item label="层级">
        <el-input v-model="props.item.层级"/>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="props.item.禁用"/>
      </el-form-item>
      <el-form-item label="可视">
        <el-switch v-model="props.item.可视"/>
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
  console.log('Selected Event Name:', Name, a);
  事件索引.value = 0
  emits("添加事件被选择", Name);

}
</script>