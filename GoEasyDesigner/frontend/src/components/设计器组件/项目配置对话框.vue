<template>
  <el-dialog
      title="项目配置"
      width="50%"
  >
    <el-form label-position="top"
             label-width="200px">
      <el-form-item label="项目根目录">
        <el-input v-model="store.项目信息.项目根目录"/>
      </el-form-item>
      <el-form-item label="设计文件路径">
        <el-input v-model="store.项目信息.设计文件路径"/>
      </el-form-item>
      <el-form-item label="窗口事件文件路径">
        <el-input v-model="store.项目信息.窗口事件文件路径"/>
      </el-form-item>
      <el-form-item label="辅助代码文件路径">
        <el-input v-model="store.项目信息.辅助代码文件路径"/>
      </el-form-item>
      <el-form-item label="项目管理目录">
        <el-input v-model="store.项目信息.项目管理目录"/>
      </el-form-item>
      <el-form-item label="IDE插件地址">
        <el-input v-model="store.项目信息.IDE插件地址"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('关闭')">关闭</el-button>
        <el-button type="primary" @click="emits('确定')">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
const emits = defineEmits(["确定","关闭"]);

</script>
