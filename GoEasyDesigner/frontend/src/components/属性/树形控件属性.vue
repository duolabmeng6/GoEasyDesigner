<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="公用属性" :item="item"/>


      <el-form-item label="可选">
        <el-switch v-model="item.可选"/>
      </el-form-item>
      <el-form-item v-if="item.可选" label="选中项">
        <el-input :autosize="{ minRows: 2, maxRows: 4 }"
                  :value="objectToJson(item.选中项)"
                  type="textarea"
        />
      </el-form-item>

      <el-form-item label="树形项目">

        <el-button @click="打开修改数据对话框(props.item.树形项目,'树形项目')">编辑</el-button>

      </el-form-item>

    </el-form>
  </div>
  <component is="公用事件组件" :item="props.item" :事件名称="事件名称"/>

  <!-- Define an edit dialog -->
  <teleport to="body">
    <el-dialog v-model="显示修改数据对话框状态" title="编辑JSON数据"
    >
      <el-input v-model="editedJSON" :autosize="{ minRows: 6, maxRows: 10 }" type="textarea"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="显示修改数据对话框状态 = false">取消</el-button>
        <el-button type="primary" @click="保存编辑的JSON数据">确定</el-button>
      </div>
    </el-dialog>
  </teleport>

</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";

import {useCounterStore} from '@/stores/counter'
import {ElMessage} from "element-plus";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

const store = useCounterStore()
const 显示修改数据对话框状态 = ref(false);
const editedJSON = ref(JSON.stringify(props.item.表头, null, 2));

let 表格布局选项 = ref([
  {"label": "固定", "value": "fixed"},
  {"label": "自动", "value": "auto"},
]);

let 标签位置选项 = ref([
  {"label": "左侧", "value": "left"},
  {"label": "右侧", "value": "right"},
  {"label": "顶部", "value": "top"},
  {"label": "底部", "value": "bottom"},
]);

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

function objectToJson(object) {
  try {
    return JSON.stringify(object, null, 2)
  } catch (e) {
    console.log("aaaa")
    return object
  }
}

function jsonToObject(jsonText, target) {
  try {
    target.value = JSON.parse(jsonText);
  } catch (error) {
    console.error('Invalid JSON:', error);
    target.value = jsonText;

  }
}

let valueName = ""

function 打开修改数据对话框(editData, name) {
  valueName = name
  显示修改数据对话框状态.value = true
  editedJSON.value = JSON.stringify(editData, null, 2)
}

function 保存编辑的JSON数据() {
  try {
    const parsedObject = JSON.parse(editedJSON.value);
    if (valueName == '表头') {
      props.item.表头 = parsedObject;
    }
    if (valueName == '树形项目') {
      props.item.树形项目 = parsedObject;
    }
    显示修改数据对话框状态.value = false;
  } catch (error) {
    console.error('Invalid JSON:', error);
    //弹出提示
    ElMessage({
      message: "JSON格式错误",
      type: 'error',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
  }
}
</script>