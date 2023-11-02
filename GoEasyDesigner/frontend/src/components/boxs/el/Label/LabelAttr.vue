<template>
  <div class="属性表格">

    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="公用属性" :item="item"/>
      <el-form-item label="文字颜色">
        <el-color-picker v-model="props.item.文字颜色" show-alpha
                         @active-change="val => props.item.文字颜色 = val"/>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="item.标题"/>
      </el-form-item>
      <el-form-item label="省略号">
        <el-switch v-model="item.省略号"/>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="props.item.尺寸" style="width: 100%">
          <el-option
              v-for="(item, index) in 尺寸选项"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-input v-model="item.字体大小"/>
      </el-form-item>

      <el-form-item label="文字样式">
        <el-select v-model="props.item.文字样式" style="width: 100%">
          <el-option
              v-for="(item, index) in 文字样式选项"
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
  </div>
  <component is="公用事件组件" :item="props.item" :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let 尺寸选项 = ref([
  "default",
  "large",
  "small",
]);


let 文字样式选项 = ref([
  {"label": "正常", "value": "p"},
  {"label": "加粗", "value": "b"},
  {"label": "斜体", "value": "i"},
  {"label": "下标", "value": "sub"},
  {"label": "插入线", "value": "ins"},
  {"label": "删除线", "value": "del"},
  {"label": "标记", "value": "mark"},
]);

let 标签位置选项 = ref([
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


let 事件名称 = ref([

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