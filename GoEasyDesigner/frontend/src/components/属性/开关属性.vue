<template>
  <div class="属性表格">

    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="公用属性" :item="item"/>


      <el-form-item label="选中">
        <el-switch v-model="item.选中"/>
      </el-form-item>
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

      <el-form-item label="选中文本">
        <el-input v-model="props.item.选中文本"/>
      </el-form-item>
      <el-form-item label="未选中文本">
        <el-input v-model="props.item.未选中文本"/>
      </el-form-item>
      <el-form-item label="内置文字">
        <el-switch v-model="props.item.内置文字"/>
      </el-form-item>


    </el-form>
  </div>
  <div class="添加组件事件">
  </div>

</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
let 尺寸选项 = ref([
  {"label": "默认", "value": "default"},
  {"label": "大号", "value": "large"},
  {"label": "小号", "value": "small"},
]);

</script>

