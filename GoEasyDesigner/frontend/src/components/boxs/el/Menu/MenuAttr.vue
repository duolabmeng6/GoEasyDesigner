<template>
  <div class="属性表格">
  <el-form
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
  >
      <component is="公用属性" :item="item"/>

      <el-form-item label="展示模式">
        <el-select v-model="props.item.展示模式" style="width: 100%">
          <el-option
              v-for="(item, index) in 展示模式选项"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否折叠(垂直时可用)">
        <el-switch v-model="item.是否折叠"/>
      </el-form-item>
    </el-form>


    <el-form label-position="top">

      <el-form-item label="菜单项目"
      >
        <el-input v-model="filterText" placeholder="搜索菜单" />


        <el-tree
            ref="treeRef"
            class="filter-tree"
            :data="props.item.菜单项目"
            :expand-on-click-node="false"
            default-expand-all
            :filter-node-method="filterNode"
            draggable
            node-key="id"
        >
          <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span style="width: 40px;">
            <el-input v-model="data.label" size="mini" style="width: 100px"></el-input>
          </span>
          <span>
            <el-button :icon="Plus" size="small" style="margin-left: 8px" @click="append(data)">  </el-button>
            <el-button :icon="Delete" size="small" style="margin-left: 8px" @click="remove(node, data)">  </el-button>
          </span>
        </span>
          </template>
        </el-tree>

        <el-button size="small" style="margin-left: 8px" @click="append(props.item.菜单项目,'top')"> 增加菜单</el-button>

      </el-form-item>
    </el-form>
  </div>
  <component is="公用事件组件" :item="props.item" :事件名称="事件名称"/>


</template>
<script setup>
import {ref, defineProps, defineEmits} from "vue";

const emits = defineEmits(["添加事件被选择"]); // 声明接受的事件
const props = defineProps(['item']);

import {Delete, Plus, Edit} from "@element-plus/icons-vue";

import {useAppStore} from '@/stores/appStore'

const store = useAppStore()
const filterText =  ref("");


let 风格类型选项 = ref([
  {"label": "简洁", "value": "card"},
  {"label": "卡片风格", "value": "border-card"},
]);

let 展示模式选项 = ref([
  {"label": "水平", "value": "horizontal"},
  {"label": "垂直", "value": "vertical"},
]);

let 事件名称 = ref([

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
let id = 1000
const append = (data, type) => {
  if (type == 'top') {
    //最后到最后
    data.push({id: id++, label: '菜单' + id, children: []})
    return
  }
  const newChild = {id: id++, label: '子菜单' + id, children: []}
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)

}


const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

const edit = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)


}


const filterNode = (value, data) => {
  console.log(value)

  if (!value) return true
  return data.label.includes(value)
}
const treeRef = ref(null)

watch(filterText, function(val) {
  treeRef.value.filter(val);
});

</script>
<style>
.el-tree-node__content{
  height: 38px !important;
}

</style>