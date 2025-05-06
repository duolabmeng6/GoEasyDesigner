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
      <el-form-item label="选项卡">
        <div v-for="(item, index) in props.item.childComponents" 
             :key="index" 
             class="tab-item-container"
             style="display: flex; align-items: center; margin-bottom: 12px; gap: 8px;">
          <el-input
              v-model="item.text"
              placeholder="选项卡标题"
              style="flex: 2;"
          />
          <icon-selector
              v-model="item.图标"
              placeholder="选择图标"
              style="flex: 1;"
          />
          <el-button 
              @click.stop="store.递归删除id(store.list, item.id)" 
              :icon="Delete" 
              type="danger"
              size="small"
              style="flex-shrink: 0;"
          />
        </div>
        <el-button 
            @click.stop="store.新增childComponents(item.id)" 
            type="primary"
            size="small"
            style="width: 100%; margin-top: 8px;">
          <el-icon class="el-icon--left"><Plus /></el-icon>
          增加选项卡
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>


</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";
import {Delete, Plus} from "@element-plus/icons-vue";
import IconSelector from '@/components/common/IconSelector.vue'

import {useAppStore} from '@/stores/appStore'

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

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