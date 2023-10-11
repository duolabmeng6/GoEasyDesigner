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
      <el-form-item label="风格类型">
        <el-select v-model="props.item.风格类型" style="width: 100%">
          <el-option
              v-for="(item, index) in 风格类型选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签位置">
        <el-select v-model="props.item.标签位置" style="width: 100%">
          <el-option
              v-for="(item, index) in 标签位置选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form label-position="top">
      <el-form-item label="选项卡"
      >
        <el-input v-for="(item, index) in props.item.子组件"
                  v-model="item.标题"
                  placeholder=""
                  style="margin-bottom: 10px"
        >
          <template #append>
            <el-button @click.stop="store.递归删除id(store.list, item.id)" :icon="Delete" size="small"></el-button>
          </template>
        </el-input>
        <el-button @click.stop="store.新增子组件(item.id)" size="small">增加选择夹</el-button>
      </el-form-item>
    </el-form>
  </div>
  <component is="公用事件组件" :item="props.item"  :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

import {Delete} from "@element-plus/icons-vue";

import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()


let 风格类型选项 = ref([
  {"label": "简洁", "value": "card"},
  {"label": "卡片风格", "value": "border-card"},
]);

let 标签位置选项 = ref([
  {"label": "左侧", "value": "left"},
  {"label": "右侧", "value": "right"},
  {"label": "顶部", "value": "top"},
  {"label": "底部", "value": "bottom"},
]);

let 事件名称 = ref([
  {"label": "在此处选择加入事件处理函数", "value": "在此处选择加入事件处理函数"},
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