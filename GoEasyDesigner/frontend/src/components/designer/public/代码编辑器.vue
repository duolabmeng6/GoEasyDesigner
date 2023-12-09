<template>
  <vue-monaco-editor
      theme="vs"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
      language="javascript"

  />
</template>
<script lang="ts" setup>
import {defineExpose, shallowRef} from 'vue'
import {useAppStore} from '@/stores/appStore'

const store = useAppStore()


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

const handleMount = (editor) => {
  editorRef.value = editor;
  store.putPosition = putPosition
};

// 在你的 Vue 组件中的某个方法中执行搜索和跳转操作
function searchAndJumpToText(searchText) {
  const editor = editorRef.value; // 获取编辑器实例
  const model = editor.getModel(); // 获取编辑器的模型

  if (model) {
    const searchRange = model.getFullModelRange(); // 搜索整个文档范围
    const match = model.findNextMatch(searchText, searchRange); // 查找匹配文本的位置
    console.log('match', match)
    if (match) {
      const lineNumber = match.range.startLineNumber;
      editor.revealLineInCenter(lineNumber); // 将匹配的行居中显示
      editor.setPosition({lineNumber: lineNumber + 2, column: 16});
    } else {
      console.log('未找到匹配的文本');
    }
  }
}


function putPosition(搜索文本) {
  console.log('========putPosition')
  // editorRef.value.getAction('editor.action.formatDocument').run()
  setTimeout(() => {
    // editorRef.value.trigger('keyboard', 'type', { text: 'hello world' });
    // editorRef.value.setPosition({ lineNumber: 5, column: 10 });
    searchAndJumpToText(搜索文本)
    editorRef.value.focus();
  }, 100);
}

// your action
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}

defineExpose({
  putPosition,
});
</script>