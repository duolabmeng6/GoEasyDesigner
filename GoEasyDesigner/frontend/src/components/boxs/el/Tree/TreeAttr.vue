<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item"/>


      <el-form-item label="select">
        <el-switch v-model="item.select"/>
      </el-form-item>
      <el-form-item v-if="item.select" label="value">
        <el-input :autosize="{ minRows: 2, maxRows: 4 }"
                  :value="objectToJson(item.value)"
                  type="textarea"
        />
      </el-form-item>

      <el-form-item label="data">

        <el-button @click="打开修改数据对话框(props.item.data,'data')">编辑</el-button>

      </el-form-item>

    </el-form>
  </div>
  <component is="common-event-component" :item="props.item"  :eventName="eventName"/>

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

import {useAppStore} from '@/stores/appStore'
import {ElMessage} from "element-plus";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

const store = useAppStore()
const 显示修改数据对话框状态 = ref(false);
const editedJSON = ref(JSON.stringify(props.item.header, null, 2));

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
    if (valueName == 'header') {
      props.item.header = parsedObject;
    }
    if (valueName == 'data') {
      props.item.data = parsedObject;
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