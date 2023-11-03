<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="common-properties" :item="item"/>
      <el-form-item label="gutter">
        <el-input-number v-model="props.item.gutter"/>
      </el-form-item>

      <el-form-item label="justify">
        <el-select v-model="props.item.justify" style="width: 100%">
          <el-option
              v-for="(item, index) in justify选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

    </el-form>
    <el-row v-for="(item, index) in props.item.childComponents" style="margin-bottom: 10px">
      <el-col :span="8">
        <el-input
            v-model="item.name"
            placeholder=""
        />

      </el-col>
      <el-col :span="8">
        <el-input
            v-model.number="item.span"
            placeholder=""
        />
      </el-col>

      <el-col :span="8">
        <el-button :icon="Delete" size="small" @click.stop="store.递归删除id(store.list, item.id)"></el-button>
      </el-col>
    </el-row>

    <el-button size="small" @click.stop="store.新增childComponents2(item.id)">增加内容区域</el-button>


  </div>
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>


</template>
<script setup>
import {ref, defineProps, defineEmits, onMounted} from "vue";
import {Delete} from "@element-plus/icons-vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);
import {useAppStore} from '@/stores/appStore'

const store = useAppStore()


let 事件索引 = ref(0)

let eventName = ref([
  {"label": "被单击", "value": "click"},
  {"label": "鼠标左键被按下", "value": "mousedown"},
  {"label": "鼠标左键被放开", "value": "mouseup"},
  {"label": "被双击", "value": "dblclick"},
  {"label": "鼠标右键被按下", "value": "contextmenu"},
  {"label": "鼠标位置被移动", "value": "mousemove"},
  {"label": "获得焦点", "value": "focus"},
  {"label": "失去焦点", "value": "blur"},
  {"label": "按下某键", "value": "keydown"},
  {"label": "放开某键", "value": "keyup"},
  {"label": "滚轮被滚动", "value": "mousewheel"}
])


const handleSelectChange = function () {
  let a = 事件索引.value
  const Name = eventName.value[a];
  console.log('添加事件被选择', Name + props.item.name);
  事件索引.value = 0
  emits("添加事件被选择", Name, props.item);
}

let justify选项 = ref([
  {"label": "从左边开始", "value": "start"},
  {"label": "从右边开始", "value": "end"},
  {"label": "居中", "value": "center"},
  {"label": "环绕空间", "value": "space-around"},
  {"label": "两端对齐", "value": "space-between"},
  {"label": "均匀分布", "value": "space-evenly"},
]);
onMounted(() => {
  if (localStorage.getItem("locale") === "English") {

    justify选项.value.forEach((item) => {
      item.label = item.value;
    });
  }
});

</script>