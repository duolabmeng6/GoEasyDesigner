<template>
  <component :is="remote" :item="item" @CustomEvent="onCustomEvent"/>
</template>

<script setup>
import {ref, watch} from 'vue';
import {loadModule} from 'vue3-sfc-loader/dist/vue3-sfc-loader.js';

const remote = ref(null);
const {item} = defineProps(['item']);
const emits = defineEmits(["CustomEvent"]);

loadComponent();
//创建监听 item.HTML 重新渲染
watch(() => item.HTML, () => {
  loadComponent();
});

async function loadComponent() {
  let style = item.HTML.match(/<style scoped>([\s\S]*)<\/style>/)?.[1] || "";
  if (style === "") {
    style = item.HTML.match(/<style>([\s\S]*)<\/style>/)?.[1] || "";
  }
  const 自定义css = style;
  //如果 item.HTML 没有 <template> 标签，就添加一个
  if (item.HTML.indexOf("<template>") === -1) {
    //将 <template> 欻人到开头 将 </template>插入到 <style>前面
    item.HTML = item.HTML.replace(/([\s\S]*)<style>/, "<template>\n$1\n</template>\n\n<style>");
  }

  const Vue = await import('vue');


  let ComponentName = "/" + item.name + "Component.vue";
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
  console.log("收到自定义事件", "eventName", name, "数据", data);
  emits("CustomEvent", name, item.data);
}
</script>