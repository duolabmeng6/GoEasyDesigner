<template>
  <div class="属性表格">

    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item"/>
      <el-form-item label="corlor">
        <el-color-picker v-model="props.item.corlor" show-alpha
                         @active-change="val => props.item.corlor = val"/>
      </el-form-item>
      <el-form-item label="text">
        <el-input v-model="item.text"/>
      </el-form-item>
      <el-form-item label="truncated">
        <el-switch v-model="item.truncated"/>
      </el-form-item>
      <el-form-item label="size">
        <el-select v-model="props.item.size" style="width: 100%">
          <el-option
              v-for="(item, index) in size选项"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="fontSize">
        <el-input v-model="item.fontSize"/>
      </el-form-item>

      <el-form-item label="tag">
        <el-select v-model="props.item.tag" style="width: 100%">
          <el-option
              v-for="(item, index) in tag选项"
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
  </div>
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>


</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let size选项 = ref([
  "default",
  "large",
  "small",
]);


let tag选项 = ref([
  {"label": "正常", "value": "p"},
  {"label": "加粗", "value": "b"},
  {"label": "斜体", "value": "i"},
  {"label": "下标", "value": "sub"},
  {"label": "插入线", "value": "ins"},
  {"label": "删除线", "value": "del"},
  {"label": "标记", "value": "mark"},
]);

let tagPosition选项 = ref([
  {"label": "居中", "value": "text-center"},
  {"label": "左上角", "value": "text-top-left"},
  {"label": "右上角", "value": "text-top-right"},
  {"label": "左下角", "value": "text-bottom-left"},
  {"label": "右下角", "value": "text-bottom-right"},
  {"label": "上中", "value": "text-top-center"},
  {"label": "下中", "value": "text-bottom-center"},
  {"label": "左中", "value": "text-left-center"},
  {"label": "右中", "value": "text-right-center"}
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

onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    tagPosition选项.value.forEach((item) => {
      item.label = item.value;
    });
    tag选项.value.forEach((item) => {
      item.label = item.value;
    });
  }
});

</script>