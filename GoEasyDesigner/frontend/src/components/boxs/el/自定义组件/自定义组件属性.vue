<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="公用属性" :item="item"/>
      <el-form-item label="HTML模板">
        <el-button @click="打开修改数据对话框(props.item.HTML,'HTML')">编辑</el-button>
      </el-form-item>
      <el-form-item label="data 格式">
        <el-input :autosize="{ minRows: 2, maxRows: 4 }"
                  :value="objectToJson(item.data)"
                  type="textarea"
        />
      </el-form-item>
    </el-form>

    <component :is="remote" :item="props.item"/>

  </div>
  <div id="事件选择器">
    <component v-if="!remote" is="公用事件组件" :item="props.item" :事件名称="事件名称"/>
  </div>

  <teleport to="body">
    <el-dialog v-model="显示修改数据对话框状态" title="编辑HTML数据"
    >
      <el-input v-model="editedJSON" :autosize="{ minRows: 6, maxRows: 10 }" type="textarea"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="显示修改数据对话框状态 = false">取消</el-button>
        <el-button type="primary" @click="保存编辑的HTML数据">确定</el-button>
      </div>
    </el-dialog>
  </teleport>


</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";

import {useAppStore} from '@/stores/appStore'
import {loadModule} from "vue3-sfc-loader";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

const store = useAppStore()
const 显示修改数据对话框状态 = ref(false);
const editedJSON = ref(JSON.stringify(props.item.表头, null, 2));

let 事件名称 = ref([
  {"label": "在此处选择加入事件处理函数", "value": "在此处选择加入事件处理函数"},
  {"label": "自定义事件", "value": "自定义事件", "ext_data": "自定义事件(事件名称,事件数据)"},
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

let valueName = ""

function 打开修改数据对话框(editData, name) {
  valueName = name
  显示修改数据对话框状态.value = true
  editedJSON.value = editData
}

function 保存编辑的HTML数据() {
  if (valueName == 'HTML') {
    props.item.HTML = editedJSON.value;
  }
  显示修改数据对话框状态.value = false;

}

function objectToJson(object) {
  try {
    return JSON.stringify(object, null, 2)
  } catch (e) {
    console.log("aaaa")
    return object
  }
}

//动态加载自定义组件的属性框
const remote = ref(null);


loadComponent();

async function loadComponent() {
  let 属性框html = ""
  try {
    const responseHtml = await fetch("./自定义组件/" + props.item.自定义组件名称 + "/" + props.item.自定义组件名称 + "属性.vue");
    属性框html = await responseHtml.text();
    console.log("属性框html", 属性框html)
    if (属性框html == "") {
      console.log("加载自定义组件属性框失败")
      return
    }
  } catch (e) {
    console.log("加载自定义组件属性框失败", e)
    return
  }

  const Vue = await import('vue');


  let ComponentName = "/" + props.item.自定义组件名称 + "Component.vue";
  const options = {
    moduleCache: {vue: Vue},
    async getFile(url) {
      if (url === ComponentName) {
        return Promise.resolve(属性框html);
      }
      if (url === '/style.css') {
        return Promise.resolve(自定义css);
      }
    },
    addStyle(textContent) {
      const style = Object.assign(document.createElement('style'), {textContent});
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
    handleModule: async function (type, getContentData, path, options) {
      switch (type) {
        case '.css':
          options.addStyle(await getContentData(false));
          return null;
      }
    },
  }
  remote.value = await loadModule(ComponentName, options);
}


</script>