<template>
  <el-form-item label="名称">
    <el-input v-model="props.item.名称"/>
  </el-form-item>
  <el-form-item label="顶边">
    <el-autocomplete
        v-model="props.item.top"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item label="左边">
    <el-autocomplete
        v-model="props.item.left"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item label="宽度">
    <el-autocomplete
        v-model="props.item.width"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item label="高度">
    <el-autocomplete
        v-model="props.item.height"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
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
const handleSelect = (item) => {
  console.log(item)
}


const restaurants = ref([])
onMounted(() => {
  restaurants.value = loadAll()
})
const querySearch = (queryString, cb) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
  cb(results)
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    {value: '100%'},
    {value: '0'},
    {value: '100'},
    {value: '200'},
    {value: '300'},
  ]
}

</script>