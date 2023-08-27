<template>
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <el-form-item label="名称">
        <el-input v-model="store.画布属性.名称"/>
      </el-form-item>
      <el-form-item label="顶边">
        <el-input v-model="store.画布属性.top"/>
      </el-form-item>
      <el-form-item label="左边">
        <el-input v-model="store.画布属性.left"/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="store.画布属性.width"/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="store.画布属性.height"/>
      </el-form-item>
      <el-form-item label="可视">
        <el-switch v-model="store.画布属性.可视"/>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="store.画布属性.标题"/>
      </el-form-item>
    </el-form>

  <el-form
      label-position="top"
      label-width="100px"
      style="max-width: 460px"
  >
    <el-form-item label="">
      <el-select v-model="事件索引" class="m-2" placeholder="Select" size="large" @change="handleSelectChange">

        <el-option
            v-for="(item, index) in 事件名称"
            :key="index"
            :label="item"
            :value="index"
        />
      </el-select>

    </el-form-item>
  </el-form>
</template>
<script setup>
import {useCounterStore} from '@/stores/counter'
import { ref, defineProps, defineEmits } from "vue";
const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const store = useCounterStore()


let 事件索引 = ref(0)

let 事件名称 = ref([
  "在此处选择加入事件处理函数",
  '创建完毕',
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