<template>
  <div class="flex h-10 justify-end flex-0">
    <button class="w-12 h-8 text-gray-500 dark:hover:text-white hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D]"
            @click="clickWindowMinimise">
      <Icon style="display: inline" icon="mdi:window-minimize"/>
    </button>
    <button class="w-12 h-8 text-gray-500 dark:hover:text-white hover:bg-[#E9E9E9] dark:hover:bg-[#2D2D2D]"
            @click="clickMaxWindow">
      <Icon style="display: inline" icon="mdi:window-maximize"/>
    </button>
    <button class="w-12 h-8 text-gray-500 hover:text-white hover:bg-[#C13124] dark:hover:bg-[#C13124]" @click="clickQuit">
      <Icon style="display: inline" icon="mdi:window-close"/>
    </button>
  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";
import {Icon} from '@iconify/vue';

const {item} = defineProps(['item'])
import {
  Quit,
  WindowMaximise,
  WindowMinimise,
  WindowUnmaximise,
  WindowFullscreen,
  WindowIsMaximised
} from "../../../../../wailsjs/runtime";
// const [isMac, setIsMac] = ref(false); // 是否是 Mac 系统

let instance = getCurrentInstance();
let designMode = instance.appContext.config.globalProperties.designMode;

async function clickMaxWindow() {
  if (designMode) {
    return;
  }
  if (await WindowIsMaximised()) {
    WindowUnmaximise();
  } else {
    WindowMaximise();
  }
}

async function clickWindowMinimise() {
  if (designMode) {
    return;
  }
  WindowMinimise();
}

async function clickQuit() {
  if (designMode) {
    return;
  }
  Quit();
}


</script>
