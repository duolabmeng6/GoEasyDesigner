<template>
  <el-select ref="select" v-model="当前选择的事件名称"
             class=""
             size="large"
             style="width: 100%"
             @change="组件事件被选择">

    <el-option
        :label="t('attr.addEvent')"
        :value="t('attr.addEvent')"
    >
      {{ $t('attr.addEvent') }}
    </el-option>
    <el-option
        v-for="(item, index) in props.事件名称"
        :key="index"
        :label="getLabelName(item)"
        :value="item.value"
    >
      <span style="float: left">{{ getLabelName(item) }}</span>
      <el-button
          v-if="props.item.hasOwnProperty(`event_${getLabelNameEn(item)}`)" size="small" style="float: right; margin-top: 4px"
          @click.stop="delete props.item[`event_${getLabelNameEn(item)}`]"
      >删除事件
      </el-button>
    </el-option>
  </el-select>

</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted, onBeforeUnmount} from "vue";

const {t,te} = i18n.global
function getLabelName(item){
  //检查当前的语言是否为英语
  if(i18n.global.locale.value === 'English'){
    let n = t('eventName.' + item.label)
    return n
  }
  return item.label
}
function getLabelNameEn(item){
    let n = te('eventName.' + item.label) ?  t('eventName.' + item.label) :  item.label
    return n
}

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item', '事件名称']);
import {useAppStore} from '@/stores/appStore'
import i18n from "../../../i18n";

const store = useAppStore()
let 当前选择的事件名称 = ref('在此处选择加入事件处理函数')
当前选择的事件名称.value = t('attr.addEvent')

const 组件事件被选择 = function () {
  // 这里需要帮助 我需要获取到 当前选择的 ext_data   {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  // 获取当前选择事件的 ext_data
  const Name = 当前选择的事件名称.value;
  console.log('添加事件被选择', Name + props.item.名称);
  const selectedEvent = props.事件名称.find(item => item.value === Name);
  const extData = selectedEvent ? selectedEvent.ext_data : null;
  console.log('当前选择的 ext_data', extData);

  当前选择的事件名称.value = t('attr.addEvent')
  emits("添加事件被选择", Name, props.item);
  store.添加事件被选择(Name, props.item, extData)
}
store.全局_事件名称列表 = props.事件名称


</script>