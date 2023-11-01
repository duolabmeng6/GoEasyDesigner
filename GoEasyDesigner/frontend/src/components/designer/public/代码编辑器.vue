<template>
  <vue-monaco-editor
      theme="vs"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
      language="javascript"

  />
</template>
<script lang="ts" setup>
import {ref, shallowRef} from 'vue'

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: {
    enabled: true // 是否启用预览图
  }, // 预览图设置
  folding: true, // 是否启用代码折叠
  // fontSize: 20,
  // lineHeight: 28,
  quickSuggestions: "always", // 始终显示建议
  quickSuggestionsDelay: 0, // 延迟显示提示，避免和输入冲突

}

// const code = ref('function hello() {\n\talert("Hello world!");\n}')
const editorRef = shallowRef()
const handleMount = editor => (editorRef.value = editor)








// your action
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>