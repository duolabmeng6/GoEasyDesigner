<template>
  <component :is="remote" :item="item" @CustomEvent="onCustomEvent"/>
</template>

<script setup>
import {ref,nextTick} from 'vue';
import {loadModule} from 'vue3-sfc-loader/dist/vue3-sfc-loader.js';

const remote = ref(null);
const {item} = defineProps(['item']);
const emits = defineEmits(["CustomEvent"]);

loadComponent();

async function loadComponent() {
  const style = item.HTML.match(/<style scoped>([\s\S]*)<\/style>/)?.[1] || "";
  const 自定义css = style;
  const Vue = await import('vue');

  let ComponentName = "/" + item.名称 + "Component.vue";
  const options = {
    moduleCache: {vue: Vue},
    async getFile(url) {
      if (url === ComponentName) {
        return Promise.resolve(item.HTML);
      }
      if (url === '/style.css') {
        return Promise.resolve(自定义css);
      }
    },
    addStyle(textContent) {
      const style = Object.assign(document.createElement('style'), {textContent});
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
    handleModule: async function (type, getContentData, path, options) {
      switch (type) {
        case '.css':
          options.addStyle(await getContentData(false));
          return null;
      }
    },
  }
  remote.value = await loadModule(ComponentName, options);
}


function onCustomEvent(name, data) {
  console.log("收到自定义事件", "事件名称", name, "数据", data);
  emits("CustomEvent", name, item.data);
}
</script>