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
  <el-form-item label="背景图片">
    <input ref="fileInput" type="file" style="display: none" @change="handleFileChange"/>
<!--    <el-input v-model="props.item.图片"/>-->
    <el-button @click="triggerFileInput">选择图片</el-button>
    <el-button @click="clearImage">清除</el-button>
  </el-form-item>
  <el-form-item label="图片平铺方式" v-show="props.item.图片">
    <el-select v-model="props.item.backgroundRepeat" style="width: 100%">
      <el-option
          v-for="(item, index) in 图片平铺方式选项"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="图片固定方式" v-show="props.item.图片">
    <el-select v-model="props.item.backgroundAttachment" style="width: 100%">
      <el-option
          v-for="(item, index) in 图片固定选项"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="图片位置" v-show="props.item.图片">
    <el-select v-model="props.item.backgroundPosition" style="width: 100%">
      <el-option
          v-for="(item, index) in 图片位置选项"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="图片尺寸" v-show="props.item.图片">
    <el-select v-model="props.item.backgroundSize" style="width: 100%">
      <el-option
          v-for="(item, index) in 图片尺寸选项"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>

  <el-form-item label="边框">
    <el-input v-model="props.item.border"/>
  </el-form-item>
  <el-form-item label="字体大小">
    <el-input v-model="props.item.fontSize"/>
  </el-form-item>

</template>
<script setup>
import {defineProps, ref} from "vue";

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
let 图片平铺方式选项 = ref([
  {"label": "重复", "value": "repeat"},
  {"label": "横向重复", "value": "repeat-x"},
  {"label": "纵向重复", "value": "repeat-y"},
  {"label": "不重复", "value": "no-repeat"},
]);
let 图片位置选项 = ref([
  {"label": "默认", "value": "0% 0%"},
  {"label": "左上", "value": "left top"},
  {"label": "居中上", "value": "center top"},
  {"label": "右上", "value": "right top"},
  {"label": "左中", "value": "left center"},
  {"label": "居中", "value": "center center"},
  {"label": "右中", "value": "right center"},
  {"label": "左下", "value": "left bottom"},
  {"label": "居中下", "value": "center bottom"},
  {"label": "右下", "value": "right bottom"},
]);
let 图片尺寸选项 = ref([
  {"label": "默认", "value": "auto"},
  {"label": "覆盖", "value": "cover"},
  {"label": "包含", "value": "contain"},
  {"label": "50% 50%", "value": "50% 50%"},
  {"label": "100% 100%", "value": "100% 100%"},
]);
let 图片固定选项 = ref([
  {"label": "滚动", "value": "scroll"},
  {"label": "固定", "value": "fixed"},
  {"label": "本地", "value": "local"},
]);

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    // 使用FileReader读取图片
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result;
      // 在这里你可以使用 base64String 进行其他操作，或者将它存储在你需要的地方
      props.item.图片 = base64String
      console.log(base64String);
    };
    reader.readAsDataURL(file);
  }
}

const fileInput = ref('');
const triggerFileInput = () => {
  fileInput.value.click();
}
const clearImage = () => {
  // 清除选择的图片
  props.item.图片 = undefined;
}


</script>