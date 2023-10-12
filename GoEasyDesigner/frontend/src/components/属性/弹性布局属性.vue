<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="公用属性" :item="item"/>
      <el-form-item label="列间隔">
        <el-input-number v-model="props.item.列间隔"/>
      </el-form-item>

      <el-form-item label="对齐方式">
        <el-select v-model="props.item.对齐方式" style="width: 100%">
          <el-option
              v-for="(item, index) in 对齐方式选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

    </el-form>
    <el-row v-for="(item, index) in props.item.子组件" style="margin-bottom: 10px">
      <el-col :span="8">
        <el-input
            v-model="item.名称"
            placeholder=""
        />

      </el-col>
      <el-col :span="8">
        <el-input
            v-model.number="item.占比"
            placeholder=""
        />
      </el-col>

      <el-col :span="8">
        <el-button :icon="Delete" size="small" @click.stop="store.递归删除id(store.list, item.id)"></el-button>
      </el-col>
    </el-row>

    <el-button size="small" @click.stop="store.新增子组件2(item.id)">增加内容区域</el-button>


  </div>
  <component is="公用事件组件" :item="props.item" :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";
import {Delete} from "@element-plus/icons-vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()


let 事件索引 = ref(0)

let 事件名称 = ref([
  {"label": "在此处选择加入事件处理函数", "value": "在此处选择加入事件处理函数"},
  {"label": "被单击", "value": "被单击"},
  {"label": "鼠标左键被按下", "value": "鼠标左键被按下"},
  {"label": "鼠标左键被放开", "value": "鼠标左键被放开"},
  {"label": "被双击", "value": "被双击"},
  {"label": "鼠标右键被按下", "value": "鼠标右键被按下"},
  {"label": "鼠标右键被放开", "value": "鼠标右键被放开"},
  {"label": "鼠标位置被移动", "value": "鼠标位置被移动"},
  {"label": "获得焦点", "value": "获得焦点"},
  {"label": "失去焦点", "value": "失去焦点"},
  {"label": "按下某键", "value": "按下某键"},
  {"label": "放开某键", "value": "放开某键"},
  {"label": "滚轮被滚动", "value": "滚轮被滚动"}
])


const handleSelectChange = function () {
  let a = 事件索引.value
  const Name = 事件名称.value[a];
  console.log('添加事件被选择', Name + props.item.名称);
  事件索引.value = 0
  emits("添加事件被选择", Name, props.item);
}

let 对齐方式选项 = ref([
  {"label": "从左边开始", "value": "start"},
  {"label": "从右边开始", "value": "end"},
  {"label": "居中", "value": "center"},
  {"label": "环绕空间", "value": "space-around"},
  {"label": "两端对齐", "value": "space-between"},
  {"label": "均匀分布", "value": "space-evenly"},
]);


</script>