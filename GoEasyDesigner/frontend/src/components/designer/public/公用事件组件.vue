<template>
    <el-select ref="select" v-model="当前选择的事件名称"
               class=""
               placeholder="在此处选择加入事件处理函数"
               size="large"
               style="width: 100%"
               @change="组件事件被选择">
      <el-option
          v-for="(item, index) in props.事件名称"
          :key="index"
          :label="item.label"
          :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <el-button
            v-if="props.item.hasOwnProperty(`事件${item.label}`)" size="small" style="float: right; margin-top: 4px"
            @click.stop="delete props.item[`事件${item.label}`]"
        >删除事件
        </el-button>
      </el-option>
    </el-select>

</template>
<script setup>
import {ref, defineProps, defineEmits,onMounted,onBeforeUnmount} from "vue";


const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item', '事件名称']);
import {useAppStore} from '@/stores/appStore'

const store = useAppStore()
let 当前选择的事件名称 = ref('在此处选择加入事件处理函数')
const 组件事件被选择 = function () {
  // 这里需要帮助 我需要获取到 当前选择的 ext_data   {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
  // 获取当前选择事件的 ext_data
  const Name = 当前选择的事件名称.value;
  console.log('添加事件被选择', Name + props.item.名称);
  const selectedEvent = props.事件名称.find(item => item.value === Name);
  const extData = selectedEvent ? selectedEvent.ext_data : null;
  console.log('当前选择的 ext_data', extData);

  当前选择的事件名称.value = '在此处选择加入事件处理函数'
  emits("添加事件被选择", Name, props.item);
  store.添加事件被选择(Name, props.item, extData)
}
store.全局_事件名称列表 = props.事件名称


</script>