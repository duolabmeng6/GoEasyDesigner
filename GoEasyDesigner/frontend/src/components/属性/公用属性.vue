<template>
      <el-form-item label="名称">
        <el-input v-model="props.item.名称"/>
      </el-form-item>
      <el-form-item label="顶边">
        <el-input v-model="props.item.top"/>
      </el-form-item>
      <el-form-item label="左边">
        <el-input v-model="props.item.left"/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="props.item.width"/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="props.item.height"/>
      </el-form-item>
      <el-form-item label="层级">
        <el-input v-model="props.item.层级"/>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="props.item.禁用"/>
      </el-form-item>
      <el-form-item label="可视">
        <el-switch v-model="props.item.可视"/>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="props.item.background" show-alpha
                         @active-change="val => props.item.background = val"/>
      </el-form-item>
      <el-form-item label="边框">
        <el-input v-model="props.item.border"/>
      </el-form-item>

</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";
const props = defineProps(['item']);
</script>