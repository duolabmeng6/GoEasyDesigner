<template>
  <t-space size="4px">

    <t-button block theme="default" variant="outline">新建
      <template #icon>
        <sneer-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">打开
      <template #icon>
        <folder-open-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">保存
      <template #icon>
        <save-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">运行
      <template #icon>
        <chevron-right-circle-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">编译
      <template #icon>
        <caret-right-small-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">帮助
      <template #icon>
        <chat-bubble-help-icon/>
      </template>
    </t-button>
    <t-button block theme="default" variant="outline">下载客户端
      <template #icon>
        <download-icon/>
      </template>
    </t-button>
  </t-space>

</template>
<script setup>
import {
  AddIcon, CaretRightSmallIcon, ChatBubbleHelpIcon,
  ChevronRightCircleIcon,
  DownloadIcon,
  FolderOpenIcon,
  OpenMouthIcon,
  SaveIcon,
  SneerIcon
} from "tdesign-icons-vue-next";
</script>