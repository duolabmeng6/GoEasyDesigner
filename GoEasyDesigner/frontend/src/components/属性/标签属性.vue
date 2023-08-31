<template>
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <component is="公用属性" :item="item"/>
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
  </el-form>
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

</script>