<template>
  <div class="添加组件事件">
    <el-select v-model="当前选择的事件名称"
               class="m-2"
               placeholder="在此处选择加入事件处理函数"
               size="large"
               @change="组件事件被选择"
               style="width: 100%">
      <el-option
          v-for="(item, index) in props.事件名称"
          :key="index"
          :label="item.label"
          :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <el-button
            style="float: right; margin-top: 4px" size="small" v-if="props.item.hasOwnProperty(`事件${item.label}`)"
            @click.stop="delete props.item[`事件${item.label}`]"
        >删除事件</el-button>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item','事件名称']);
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()
let 当前选择的事件名称 = ref('在此处选择加入事件处理函数')
const 组件事件被选择 = function () {
  const Name = 当前选择的事件名称.value;
  console.log('添加事件被选择', Name + props.item.名称);
  当前选择的事件名称.value = '在此处选择加入事件处理函数'
  // emits("添加事件被选择", Name, props.item);
  store.添加事件被选择(Name, props.item)
}
store.全局_事件名称列表 = props.事件名称


</script>