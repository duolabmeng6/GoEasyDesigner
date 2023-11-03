<template>
  <el-select ref="select" v-model="当前选择的事件名称"
             class=""
             size="large"
             style="width: 100%"
             @change="组件事件被选择">

    <el-option
        :label="t('attr.addEvent')"
        :value="0"
    >
      {{ $t('attr.addEvent') }}
    </el-option>
    <el-option
        v-for="(item, index) in props.eventName"
        :key="index"
        :label="item.label"
        :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <el-button
          v-if="props.item.hasOwnProperty(`event_${item.value}`)" size="small"
          style="float: right; margin-top: 4px"
          @click.stop="delete props.item[`event_${item.value}`]"
      >删除事件
      </el-button>
    </el-option>
  </el-select>

</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted, onBeforeUnmount} from "vue";

const t = i18n.global.t

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item', 'eventName']);
import {useAppStore} from '@/stores/appStore'
import i18n from "../../../i18n";

const store = useAppStore()
let 当前选择的事件名称 = ref('在此处选择加入事件处理函数')
当前选择的事件名称.value = t('attr.addEvent')

const 组件事件被选择 = function () {
  // 这里需要帮助 我需要获取到 当前选择的 ext_data   {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  // 获取当前选择事件的 ext_data
  if (当前选择的事件名称.value === 0) {
    return
  }

  const nowSelectItem = props.eventName.find(item => item.value === 当前选择的事件名称.value);
  const extData = nowSelectItem ? nowSelectItem.ext_data : null;
  const value = nowSelectItem ? nowSelectItem.value : null;

  emits("添加事件被选择", 当前选择的事件名称.value, props.item); //通知父组件处理

  //驼峰
  let 函数名称;
  if (i18n.global.locale.value === "简体中文") {
    函数名称 = props.item.name + nowSelectItem.label
  } else {
    let 新事件名称 = nowSelectItem.value.toLowerCase().replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase();
    });
    函数名称 = props.item.name + 新事件名称
  }

  store.添加事件被选择(nowSelectItem.value, 函数名称, props.item, extData) // 添加函数到代码中
  当前选择的事件名称.value = 0

  console.log("组件事件被选择=", props.item.name, '事件', 当前选择的事件名称.value, 'value', value, 'ext_data', extData, JSON.stringify(props.item, null, 2));

}
store.全局_事件名称列表 = props.eventName


onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    try {
      props.eventName.forEach((item) => {
        item.label = item.value;
      });
    }catch (e) {
      console.log("e", e)
    }

  }
});

</script>