<template>
  <el-form-item :label="$t('attr.name')">
    <el-input v-model="props.item.name"/>
    <div v-if="是否存在" style="color:red">名称已存在</div>
  </el-form-item>
  <el-form-item :label="$t('attr.top')">
    <el-autocomplete
        v-model="props.item.top"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.left')">
    <el-autocomplete
        v-model="props.item.left"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.right')">
    <el-autocomplete
        v-model="props.item.right"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.bottom')">
    <el-autocomplete
        v-model="props.item.bottom"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.width')">
    <el-autocomplete
        v-model="props.item.width"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.height')">
    <el-autocomplete
        v-model="props.item.height"
        :fetch-suggestions="querySearch"
        class="inline-input w-50"
        clearable
        placeholder="单位:1px 100% auto"
        @select="handleSelect"
    />
  </el-form-item>
  <el-form-item :label="$t('attr.zIndex')">
    <el-input v-model="props.item.zIndex"/>
  </el-form-item>
  <el-form-item :label="$t('attr.disable')">
    <el-switch v-model="props.item.disable"/>
  </el-form-item>
  <el-form-item :label="$t('attr.visible')">
    <el-switch v-model="props.item.visible"/>
  </el-form-item>
  <el-form-item :label="$t('attr.backgroundColor')">
    <el-color-picker v-model="props.item.background" show-alpha
                     @active-change="val => props.item.background = val"/>
  </el-form-item>
  <el-form-item :label="$t('attr.backgroundImage')">
    <input ref="fileInput" type="file" style="display: none" @change="handleFileChange"/>
    <!--    <el-input v-model="props.item.图片"/>-->
    <el-button @click="triggerFileInput">{{ $t('app.selectImage') }}</el-button>
    <el-button v-show="props.item.图片" @click="clearImage">{{ $t('app.clear') }}</el-button>
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
  <el-form-item label="图片size" v-show="props.item.图片">
    <el-select v-model="props.item.backgroundSize" style="width: 100%">
      <el-option
          v-for="(item, index) in 图片size选项"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>

  <el-form-item :label="$t('attr.border')">
    <el-input v-model="props.item.border"/>
  </el-form-item>
  <el-form-item :label="$t('attr.fontSize')">
    <el-input v-model="props.item.fontSize"/>
  </el-form-item>

  <el-form-item :label="$t('attr.yAxisRollingMode')">
    <el-select v-model="props.item.overflowY" style="width: 100%">
      <el-option
          v-for="(item, index) in overflowY"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item :label="$t('attr.xAxisRollingMode')">
    <el-select v-model="props.item.overflowX" style="width: 100%">
      <el-option
          v-for="(item, index) in overflowX"
          :key="item"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </el-form-item>

</template>

<script setup>
import {defineProps, onMounted, ref, watch} from "vue";
import {useAppStore} from '@/stores/appStore'

const props = defineProps(['item']);

const store = useAppStore()


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
    {value: 'inherit'},
    {value: '100vw'},
    {value: '100vh'},
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
let 图片size选项 = ref([
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

let overflowY = ref([
  {"label": "超出显示", "value": "visible"},
  {"label": "超出隐藏", "value": "hidden"},
  {"label": "滚动显示", "value": "scroll"},
  {"label": "自动适配", "value": "auto"},
]);
let overflowX = ref([
  {"label": "超出显示", "value": "visible"},
  {"label": "超出隐藏", "value": "hidden"},
  {"label": "滚动显示", "value": "scroll"},
  {"label": "自动适配", "value": "auto"},
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


onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    overflowX.value.forEach((item) => {
      item.label = item.value;
    });
    overflowY.value.forEach((item) => {
      item.label = item.value;
    });
    图片固定选项.value.forEach((item) => {
      item.label = item.value;
    });
    图片size选项.value.forEach((item) => {
      item.label = item.value;
    });
    图片位置选项.value.forEach((item) => {
      item.label = item.value;
    });
    图片平铺方式选项.value.forEach((item) => {
      item.label = item.value;
    });
  }
});

// watch(()=>props.item.name, (newVal, oldVal) => {
//   if (newVal !== oldVal) {
//     //检查新值是否已经存在
//     let 是否存在 = store.递归查找名称(store.list, newVal)
//     console.log("是否存在", 是否存在,newVal)
//
//     console.log("刷新")
//     store.取组件列表()
//
//
//   }
// });

const 是否存在 = ref(false);
let n = store.递归查找名称数量(store.list, props.item.name);
是否存在.value = n >= 2;

watch(() => props.item.name, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    let n = store.递归查找名称数量(store.list, newVal);
    是否存在.value = n >= 2;
    console.log("是否存在", 是否存在.value, newVal);
    console.log("刷新");
    store.取组件列表();
  }
});

</script>

<style>
.el-form-item__label {
  width: inherit !important;
  min-width: 100px !important;

}
</style>