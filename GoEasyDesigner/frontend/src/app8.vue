<template>
  <el-row>
    <el-col :span="24" style="margin-bottom: 20px">
      <el-button :icon="Edit" @click="打开">打开</el-button>
      <el-button :icon="Edit" @click="保存">保存</el-button>
      <el-button :icon="Edit" @click="运行">运行</el-button>
      <el-button :icon="Edit" @click="编译">编译</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5" style="padding: 10px" class="clear-select">

      <div class="组件列表" v-if="store.当前拖拽组件数据 != undefined">
        <el-select
            v-model="store.当前组件索引" :dd="store.当前拖拽组件数据.id" class="m-2" placeholder="组件列表"
                    style="width: 100%;margin-bottom: 20px;" @change="id=>console.log('id',store.当前拖拽组件数据 = store.组件通过id查找结构(id))">
          <el-option
              v-for="(item, index) in store.组件列表"
              :key="index"
              :label="item.label"
              :value="item.id"
          />
        </el-select>
      </div>

      <component v-if="store.当前拖拽组件数据 != undefined"
                 :is="store.当前组件名称2()"
                 @添加事件被选择="添加事件被选择"
                 :item="store.当前拖拽组件数据"
      />

    </el-col>
    <el-col :span="15">
      <div style="position: relative">
        <component is="渲染组件"  v-for="(item, index) in store.list" :key="index" :item="item"/>

      </div>
    </el-col>
    <el-col :span="4"  class="clear-select">

      <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="组件">
          <el-collapse model-value="1"  accordion style="border: none;padding: 10px">
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
import {useCounterStore} from '@/stores/counter'
import {ElMessage} from "element-plus";
import {Edit} from "@element-plus/icons-vue";
import {E创建函数} from "../wailsjs/go/main/App";
import {生成辅助代码} from "@/public";

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
    新属性.border = "1px solid black"
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
    "id": "1",
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
store.取组件列表()
store.当前拖拽组件数据 = store.组件通过id查找结构("1")

function 保存(){
  console.log("保存")
  let njson = JSON.stringify(store.list, null, 2)
  const blob = new Blob([njson], {type: 'application/json'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '组件数据.json'
  link.click()

  let 辅助代码 = 生成辅助代码(store.list[0].子组件)
  const blob2 = new Blob([辅助代码], {type: 'application/json'})
  const link2 = document.createElement('a')
  link2.href = URL.createObjectURL(blob2)
  link2.download = '辅助代码.js'
  link2.click()
}
function 添加事件被选择(事件名称,item) {
  if (事件名称 == "在此处选择加入事件处理函数") {
    return
  }
  console.log("添加事件被选择", 事件名称)
  console.log("添加事件被选择", item.名称 + "_" + 事件名称)
  let code = "item.事件" + 事件名称 + "=" + '"' + item.名称 + 事件名称 + '"'
  console.log(code)
  eval(code)
  let ncode = `
    c.{事件名称} = function () {
        console.log("{事件名称}")
    }
`;

  try{
    // 替换 {事件名称} 为 事件名称
    ncode = ncode.replace(/{事件名称}/g, item.名称 + 事件名称)
    console.log(ncode)

    console.log(store.项目信息.窗口事件文件路径)
    E创建函数(store.项目信息.窗口事件文件路径, ncode, store.项目信息.IDE插件地址).then(
        (res) => {
          console.log(res)
        }
    )
    // 保存()
  } catch (e) {
    console.log("需要客户端中运行")
  }

}
</script>

<style>
.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
.clear-select{
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer / Edge */
}

</style>