<template>
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="item.data.username"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="item.data.password"/>
    </el-form-item>
    <el-form-item label="密码提示框">
      <el-input v-model="item.data.password_error_msg"/>
    </el-form-item>
    <el-form-item label="用户名提示框">
      <el-input v-model="item.data.username_error_msg"/>
    </el-form-item>
  </el-form>
  <teleport to="#事件选择器">
    <component is="公用事件组件" :item="item" :事件名称="事件名称"/>
  </teleport>
</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const {item} = defineProps(['item']);

let 事件名称 = ref([
  {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  {"label": "登录按钮被点击", "value": "登录按钮被点击"},
  {"label": "忘记密码被点击", "value": "忘记密码按钮被点击"},
])
</script>

