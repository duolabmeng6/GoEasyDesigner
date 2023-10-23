<template>
  <component :is="remote" :item="item"/>
</template>

<script setup>
import {loadModule} from 'vue3-sfc-loader/dist/vue3-sfc-loader.js';
import {onMounted, ref, watch} from 'vue';

const remote = ref(null);
const {item} = defineProps(['item']);
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
  const tailwindCSS = `
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    /* Add additional Tailwind CSS customization here */
  `;
  const Vue = await import('vue');

  const options = {
    moduleCache: {
      vue: Vue,
    },
    getFile(url) {
      if (url === '/myPugComponent.vue') {
        if (url.endsWith('.css')) {
          // Return the Tailwind CSS content
          return Promise.resolve(tailwindCSS);
        } else {
          // Return the Vue component content
          return Promise.resolve(sfcContent);
        }
      }
    },
    addStyle: () => {
    },
  };

  const loadedModule = await loadModule('/myPugComponent.vue', options);

  // Assuming the loaded module contains a default export that is a Vue component
  // You might need to adjust this based on your component structure
  remote.value = loadedModule.default || loadedModule;
  currentComponent = remote.value;
}
</script>