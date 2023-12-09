<template>
  <el-dialog
      title="创建项目"
      width="50%"
  >
    <el-form label-position="top"
             label-width="200px">
      <el-form-item label="选择模板">
        <t-select
            v-model="项目URL"
            :options="options"
            placeholder="请选择模板项目"
            clearable
            @focus="onFocus"
            @blur="onBlur"
        ></t-select>

      </el-form-item>
      <el-form-item label="模板项目地址">
        <el-input v-model="项目URL"/>
      </el-form-item>

      <el-form-item label="项目目录">
        <el-input v-model="当前项目目录"/>
        <el-button  @click="选择目录">选择目录</el-button>
      </el-form-item>

      <el-form-item label="项目名称">
        <el-input v-model="项目名称"/>
      </el-form-item>


    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('关闭')">关闭</el-button>
        <el-button type="primary" @click="创建项目事件">
          创建项目
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup  lang="jsx">
import { defineEmits, defineProps, onMounted, watch,ref } from "vue";
import { useAppStore } from "@/stores/appStore";
const store = useAppStore();
const emits = defineEmits(["创建项目","关闭"]);
import * as goFc from "@/../wailsjs/go/main/App";
import {ElMessage} from "element-plus";
import {appAction} from "@/action/app";

const options = [
  { label: '示例项目', value: "https://github.com/duolabmeng6/wails-template-vue-go-easy" },
  { label: '投屏软件示例项目', value: "https://github.com/duolabmeng6/projection_screen_tv" },
  { label: '自定义远程Github项目', value: "" },
];



const 项目URL = ref(options[0].value);
let 当前项目目录 = ref("");
let 项目目录 = ref("");
let 项目名称 = ref("myporject");

onMounted(async () => {
  项目目录.value = await goFc.E取当前目录();
  console.log("项目目录",项目目录.value)
  let files = await goFc.E搜索文件(项目目录.value+"/TemplateProject",".zip")
  // C:\eview\v2\GoEasyDesigner\TemplateProject
//加入到options
  console.log("搜索文件",files,项目目录.value+"/TemplateProject")
  if(files){
    for (let i = 0; i < files.length; i++) {
      let label = files[i]
      //获取文件名
      let index = label.lastIndexOf("/");
      label = label.substring(index + 1, label.length);
      //删除.zip
      label = "本地项目-" + label.replace(".zip","")

      options.push({label:label,value:files[i]})
    }
  }




});
// 我需要项目名称修改了以后 项目目录 为 项目目录/项目名称
watch(项目名称, (newName, oldName) => {
  当前项目目录.value = 项目目录.value + '/' + 项目名称.value;
});

watch(项目目录, (newName, oldName) => {
  当前项目目录.value = 项目目录.value + '/' + 项目名称.value;
});

const onFocus = (ctx) => {
  console.log('focus:', ctx);
};

const onBlur = (ctx) => {
  console.log('blur:', ctx);
};

const 选择目录 = async () => {
  const result = await goFc.E打开选择文件夹对话框();
  console.log("选择目录",result)
  if (result !=="") {
    项目目录.value = result;
  }
};

async function 创建项目事件(){
  console.log("项目url",项目URL.value)
  console.log("项目目录",当前项目目录.value)
  console.log("项目名称",项目名称.value)
  if( await goFc.E文件是否存在(当前项目目录.value)){
    //弹出饿了么信息框 提示创建失败
    ElMessage({
      message: '项目目录已经存在',
      type: 'error',
    });
    return
  }

  let ret = await goFc.E下载github项目(项目URL.value,当前项目目录.value)
  if(ret === 'success'){
    emits('关闭')
  }else{
    //弹出饿了么信息框 提示创建失败
    ElMessage({
      message: '项目创建失败'+ret,
      type: 'error',
    });
  }
  // 搜索 design.json 文件
  let files = await goFc.E搜索文件(当前项目目录.value,"design.json")
  if (files.length === 0){
    //弹出饿了么信息框 提示创建失败
    ElMessage({
      message: '项目目录下没有找到design.json文件',
      type: 'error',
    });
    return
  }
  console.log("搜索文件",files)
  appAction._打开文件加载界面(files[0])
  emits('关闭')

}

</script>
