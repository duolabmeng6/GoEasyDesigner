<template>
  <div class="属性表格">

  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <component is="common-properties" :item="item"/>
    <el-form-item label="size">
      <el-select v-model="props.item.size" style="width: 100%">
        <el-option
            v-for="(item, index) in sizeOptions"
            :key="item"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="buttonGroup">
      <el-switch v-model="item.buttonGroup"/>
    </el-form-item>
    <el-form-item label="border">
      <el-switch v-model="item.border"/>
    </el-form-item>
    <el-form-item label="value">
      <el-input v-model="item.value"/>
    </el-form-item>

    <el-form label-position="top">
      <el-form-item label="options"
      >
        <el-row v-for="(item, index) in props.item.options">
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
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>


</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";
import {Delete} from "@element-plus/icons-vue";

import {useAppStore} from '@/stores/appStore'

const store = useAppStore()

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let sizeOptions = ref([
  {"label": "默认", "value": "default"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);

function 删除(value) {
  let index = props.item.options.findIndex((item) => item.value === value);
  props.item.options.splice(index, 1);
}

function 增加() {
  let k = store.获取索引(props.item.name + "options")

  props.item.options.push({"label": "标签" + k, "value": k});
}



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


onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
  }
});
</script>

