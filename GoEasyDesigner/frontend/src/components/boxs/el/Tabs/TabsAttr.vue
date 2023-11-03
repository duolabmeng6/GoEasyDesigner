<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="common-properties" :item="item"/>
      <el-form-item label="value">
        <el-input v-model="props.item.value"/>
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
      <el-form-item label="tagPosition">
        <el-select v-model="props.item.tagPosition" style="width: 100%">
          <el-option
              v-for="(item, index) in tagPosition选项"
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
        <el-input v-for="(item, index) in props.item.childComponents"
                  v-model="item.text"
                  placeholder=""
                  style="margin-bottom: 10px"
        >
          <template #append>
            <el-button @click.stop="store.递归删除id(store.list, item.id)" :icon="Delete" size="small"></el-button>
          </template>
        </el-input>
        <el-button @click.stop="store.新增childComponents(item.id)" size="small">增加选择夹</el-button>
      </el-form-item>
    </el-form>
  </div>
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

import {Delete} from "@element-plus/icons-vue";

import {useAppStore} from '@/stores/appStore'

const store = useAppStore()


let type选项 = ref([
  {"label": "简洁", "value": "card"},
  {"label": "卡片风格", "value": "border-card"},
]);

let tagPosition选项 = ref([
  {"label": "左侧", "value": "left"},
  {"label": "右侧", "value": "right"},
  {"label": "顶部", "value": "top"},
  {"label": "底部", "value": "bottom"},
]);

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