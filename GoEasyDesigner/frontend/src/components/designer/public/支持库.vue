<template>
  <el-tree
      :data="store.支持库列表"
      @node-click="handleNodeClick"/>

</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'

import {useAppStore} from "@/stores/appStore";
import systemFcDoc from "@/helpDoc/systemFcDoc.json";

const systemFcDocHandle = [];
systemFcDoc.forEach(item => {
  let l = JSON.parse(JSON.stringify(item));
  const label = item.label;
  const doc = item.doc;
  const extractedContent = doc.split(' ')[0];
  l.label = label + " " + extractedContent;
  systemFcDocHandle.push(l);
});

// function 提取函数(){
//   import * as SystemFc from "@/../wailsjs/runtime";
//   const systemFcFunctions = Object.keys(SystemFc).filter(key => key !== "default" && key !== "constructor");
//   let systemFcNames = [];
//   systemFcFunctions.forEach(functionName => {
//     const functionModule = SystemFc[functionName];
//     if (typeof functionModule === "function") {
//       let helpText = `SystemFc.${functionName}`;
//       let argList = [];
//       const args = functionModule.toString().match(/function[^{]*\(([^)]*)\)/)[1].split(",");
//       for (let i = 0; i < args.length; i++) {
//         argList.push(args[i].trim());
//       }
//       let o ={
//         label: functionName,
//         help: `${helpText}(${argList.join(", ")})`,
//         doc:''
//       }
//       systemFcNames.push(o);
//     }
//   });
//   console.log(JSON.stringify(systemFcNames,null,2))
// }
//
const store = useAppStore()

const handleNodeClick = (data) => {
  console.log(data)
  //检查data是否有doc
  if (data.doc !== undefined) {
    store.帮助信息 = `
方法名：${data.label} <br>
调用格式：${data.help}<br>
详细帮助：${data.doc} <br>`
  } else {
    store.帮助信息 = data.help
  }
}
store.支持库列表 = [
  {
    label: 'wails Support library (JS)',
    help: 'import * as systemFc from "@/../wailsjs/runtime";',
    children: [
      {
        label: 'systemFc',
        help: 'import * as systemFc from "@/../wailsjs/runtime";',
        children: systemFcDocHandle
      }
    ]
  },
  {
    label: '易函数(Goefun)中文函数支持库 (GO)',
    help: '打开 https://github.com/duolabmeng6/goefun 学习并使用 该库可以用于app.go代码的编码 ，它提供了强大而易于使用的函数，它完整封装了易语言核心支持库的所有功能，同时提供简单易用的函数。',
  },
]
onMounted(() => {

})

</script>