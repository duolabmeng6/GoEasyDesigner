import {defineEmits} from "vue";

export default {
    top: "150",
    left: "440",
    width: "300",
    height: "300",
    禁止放置: true,
    可视: true,
    禁止: false,
    层级: 0,
    data:{
        username: 'admin',
        password: 'admin',
    },

    HTML: `<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          用户名
        </label>
        <!-- Move v-model to the input element -->
        <input v-model="item.data.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="用户名">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          密码
        </label>
        <!-- Move v-model to the input element -->
        <input v-model="item.data.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p class="text-red-500 text-xs italic">请输入密码.</p>
      </div>
      <div class="flex items-center justify-between">
        <button 
        @click="onSubmit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          登录
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          忘记密码?
        </a>
      </div>
    </form>
  </div>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";

const { item } = defineProps(['item'])
console.log("自定义组件数据", item);
const emits = defineEmits(["CustomEvent"]); 
console.log("自定义组件事件", emits);
function onSubmit() {
    console.log("触发登录","发送数据", item.data);
    emits("CustomEvent","click_login",item.data); 
}

</script>
`
}
