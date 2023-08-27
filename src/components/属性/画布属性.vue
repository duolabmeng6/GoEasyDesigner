<template>
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <el-form-item label="名称">
        <el-input v-model="store.画布属性.名称"/>
      </el-form-item>
      <el-form-item label="顶边">
        <el-input v-model="store.画布属性.top"/>
      </el-form-item>
      <el-form-item label="左边">
        <el-input v-model="store.画布属性.left"/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="store.画布属性.width"/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="store.画布属性.height"/>
      </el-form-item>
      <el-form-item label="可视">
        <el-switch v-model="store.画布属性.可视"/>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="store.画布属性.标题"/>
      </el-form-item>
    </el-form>

</template>
<script setup>
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()


</script>