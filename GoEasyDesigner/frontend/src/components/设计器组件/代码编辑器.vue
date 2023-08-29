<template>
  <vue-monaco-editor
      v-model:value="code"
      theme="vs"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
      language="javascript"

  />
</template>
<style scoped>

</style>
<script lang="ts" setup>
import {ref, shallowRef} from 'vue'

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: {
    enabled: false // 是否启用预览图
  }, // 预览图设置
  folding: true, // 是否启用代码折叠
  // fontSize: 20,
  // lineHeight: 28,
  quickSuggestions: "always",
  quickSuggestionsDelay: 0,
  suggest: {
    // 全部禁用代码提示，包括编辑器自带的和其他页面添加的
    enabled: false,
    // 启用编辑器自带的输入建议
    quickSuggestions: true,
    // 启用其他页面添加的代码提示
    otherPageSuggestions: true
  }
}

// const code = ref('function hello() {\n\talert("Hello world!");\n}')
const editorRef = shallowRef()
const handleMount = editor => (editorRef.value = editor)

// your action
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>