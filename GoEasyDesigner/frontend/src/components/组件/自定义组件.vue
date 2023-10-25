<template>
  <component :is="remote" :item="item" @CustomEvent="onCustomEvent"/>
</template>

<script setup>
import {loadModule} from 'vue3-sfc-loader/dist/vue3-sfc-loader.js';
import {onMounted, ref, watch} from 'vue';

const remote = ref(null);
const {item} = defineProps(['item']);
const emits = defineEmits(["CustomEvent"]);
let currentComponent = null;
onMounted(() => {
  loadComponent();
});

// Watch for changes in item.HTML
watch(() => item.HTML, () => {
  unloadComponent();
  loadComponent();
});

async function unloadComponent() {
  if (currentComponent) {
    currentComponent = null;
  }
}

async function loadComponent() {
  const sfcContent = item.HTML
  //从 item.HTML 提取 <style scoped></style> 的内容 如果不存在就给一个空的
  const style = sfcContent.match(/<style scoped>([\s\S]*)<\/style>/)?.[1] || "";


  const tailwindCSS = `
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    /* Add additional Tailwind CSS customization here */
  ` + style;
  console.log("tailwindCSS", tailwindCSS)
  const Vue = await import('vue');

  // const options = {
  //
  //   moduleCache: {
  //     vue: Vue,
  //   },
  //   getFile(url) {
  //     if (url === '/myPugComponent.vue') {
  //       console.log("url", url)
  //       if (url.endsWith('.css')) {
  //         // Return the Tailwind CSS content
  //         return Promise.resolve(tailwindCSS);
  //       } else {
  //         // Return the Vue component content
  //         return Promise.resolve(sfcContent);
  //       }
  //     }
  //   },
  //   addStyle: () => {
  //   },
  // };

  const config = {
    files: {
      '/style.css': tailwindCSS,
      '/myPugComponent.vue': sfcContent
    }
  };
  const options = {
    moduleCache: { vue: Vue },
    getFile: url => config.files[url],
    addStyle(textContent) {

      const style = Object.assign(document.createElement('style'), { textContent });
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

  const loadedModule = await loadModule('/myPugComponent.vue', options);

  // Assuming the loaded module contains a default export that is a Vue component
  // You might need to adjust this based on your component structure
  remote.value = loadedModule.default || loadedModule;
  currentComponent = remote.value;
}

function onCustomEvent(name, data) {
  console.log("收到自定义事件", "事件名称", name, "数据", data);
  emits("CustomEvent", name, item.data);
}
</script>