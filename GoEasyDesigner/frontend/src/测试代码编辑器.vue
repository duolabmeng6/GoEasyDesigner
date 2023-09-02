<template>
  <el-button @click="重新生成提示">重新生成提示</el-button>
  <div style="height: 100vh;width: 100vh">
    <component is="代码编辑器" v-model:value="store.代码编辑器内容"
               height="100%"
    />
  </div>
</template>
<script setup>
import {inject} from 'vue'
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()
store.代码编辑器内容 = `
export function 绑定窗口事件(c, 组件) {
    c.窗口创建完毕 = function () {
        console.log("窗口创建完毕")
    }

    c.按钮1被单击 = function () {
        console.log("按钮1被单击")
        组件.编辑框1.内容 = "祖国,您好!"
    }

//事件函数位置不要删除

}


`
// let keywordMappings = inject("keywordMappings")

function 重新生成提示(){
  console.log("重新生成提示")
  console.log(store.keywordMappings)
  store.keywordMappings = {
    "bjk": { insertText: "编辑框", label: "bjk编辑框" },
    "zj": { insertText: "组件", label: "zj组件" },
    "nr": { insertText: "内容", label: "nr内容" },
  }
   console.log(store.keywordMappings)
}
</script>
