<template>
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <el-form-item label="名称">
        <el-input v-model="store.组件列表[store.当前组件索引].名称"/>
      </el-form-item>
      <el-form-item label="顶边">
        <el-input v-model="store.组件列表[store.当前组件索引].style.top"/>
      </el-form-item>
      <el-form-item label="左边">
        <el-input v-model="store.组件列表[store.当前组件索引].style.left"/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="store.组件列表[store.当前组件索引].style.width"/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="store.组件列表[store.当前组件索引].style.height"/>
      </el-form-item>
      <el-form-item label="可视">
        <el-switch v-model="store.组件列表[store.当前组件索引].可视"/>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="store.组件列表[store.当前组件索引].标题"/>
      </el-form-item>
      <el-form-item label="点击事件">
        <el-input v-model="store.组件列表[store.当前组件索引].点击事件" type="textarea"/>
      </el-form-item>
    </el-form>
</template>
<script setup>
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()




</script>