<template>
  <div class="属性表格">

  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <component is="公用属性" :item="item"/>
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
    <el-form-item label="按钮组">
      <el-switch v-model="item.按钮组"/>
    </el-form-item>
    <el-form-item label="带边框">
      <el-switch v-model="item.带边框"/>
    </el-form-item>
    <el-form-item label="现行选中项">
      <el-input v-model="item.现行选中项"/>
    </el-form-item>

    <el-form label-position="top">
      <el-form-item label="选项"
      >
        <el-row v-for="(item, index) in props.item.选项">
          <el-col :span="10">
            <el-input
                v-model="item.label"
                placeholder=""
            />
          </el-col>

          <el-col :span="10">
            <el-input
                v-model="item.value"
                placeholder=""
            />
          </el-col>
          <el-col :span="4">
            <el-button @click.stop="删除(item.value)" :icon="Delete" size="small"></el-button>

          </el-col>
        </el-row>

        <el-button @click.stop="增加()" size="small">增加选择夹</el-button>
      </el-form-item>
    </el-form>

  </el-form>
  </div>
  <component is="公用事件组件" :item="props.item"  :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";
import {Delete} from "@element-plus/icons-vue";

import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let 尺寸选项 = ref([
  {"label": "默认", "value": "default"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);

function 删除(value) {
  let index = props.item.选项.findIndex((item) => item.value === value);
  props.item.选项.splice(index, 1);
}

function 增加() {
  let k = store.获取索引(props.item.名称 + "选项")

  props.item.选项.push({"label": "标签" + k, "value": k});
}



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

