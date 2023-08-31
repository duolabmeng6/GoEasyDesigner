<template>
  <el-row>
    <el-col :span="5">
      <component v-if="store.当前拖拽组件数据 != undefined"
                 :is="store.当前组件名称2()"
                 @添加事件被选择="添加事件被选择"
                 :item="store.当前拖拽组件数据"
      />

    </el-col>
    <el-col :span="15">
      <div style="position: relative">
        <RecursiveItem v-for="(item, index) in store.list" :key="index" :item="item"/>

      </div>
    </el-col>
    <el-col :span="4">

      <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="组件">
          <el-collapse model-value="1" @change="handleChange" accordion style="border: none;padding: 10px">
            <el-collapse-item title="系统组件" name="1">
              <el-row>
                <el-col :span="24" style="margin-bottom: 8px" v-for="(item, index) in 组件名称列表">
                  <el-button class="full-width-button" style="width: 100%;"
                             draggable="true"
                             @dragstart="拖拽开始($event, item)"
                  >
                    {{ item }}
                  </el-button>

                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="数据展示组件" name="2">

            </el-collapse-item>
            <el-collapse-item title="自定义组件" name="3">

            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>


    </el-col>
  </el-row>
</template>

<script setup>
import {ref, inject} from 'vue';
import RecursiveItem from "@/RecursiveItem.vue";
import {useCounterStore} from '@/stores/counter'
import {ElMessage} from "element-plus";

const store = useCounterStore()
const 创建组件属性默认值 = inject("创建组件属性默认值")

function 拖拽开始(event, 组件名称) {
  let 新属性 = ""
  try {
    新属性 = JSON.parse(JSON.stringify(创建组件属性默认值[组件名称]))
  } catch (e) {
  }
  if (新属性 == "") {
    console.log("未配置默认属性")
    //弹出提示
    ElMessage({
      message: "组件未配置默认属性",
      type: 'success',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
    //阻止默认行为和停止事件
    event.preventDefault()
    event.stopPropagation()
    return
  }
  let k = store.获取索引(组件名称)

  新属性.id = store.获取随机id()
  新属性.组件名称 = 组件名称
  新属性.名称 = 组件名称 + k
  新属性.标题 = 组件名称 + k

  if (组件名称 == "按钮") {
  }
  if (组件名称 == "布局容器") {
    新属性.border = "1px solid red"
  }
  if (组件名称 == "选择夹") {
    let id = 新属性.id
    新属性.子组件[0].id = store.获取随机id()
    新属性.子组件[0].标题 = "选项卡" + store.获取索引(id + "选项卡")
    新属性.子组件[0].子组件[0].id = store.获取随机id()
    新属性.子组件[0].子组件[0].父容器id = id
    新属性.子组件[1].id = store.获取随机id()
    新属性.子组件[1].标题 = "选项卡" + store.获取索引(id + "选项卡")
    新属性.子组件[1].子组件[0].id = store.获取随机id()
    新属性.子组件[1].子组件[0].父容器id = id
  }
  if (组件名称 == "开关") {
  }
  if (组件名称 == "编辑框") {
    新属性.内容 =  新属性.标题
  }

  store.当前拖拽组件数据 = 新属性
}

const list = ref([
  {
    "名称": "窗口",
    "组件名称": "窗口",
    "top": "0",
    "left": "0",
    "width": "600",
    "height": "700",
    "background": "rgba(0, 0, 0, 0.1)",
    "禁止放置": false,
    "禁止拖动": true,
    "禁止": false,
    "可视": true,
    "层级": 0,
    "子组件": []
  }
])
store.list = list

</script>

<style>
.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
</style>