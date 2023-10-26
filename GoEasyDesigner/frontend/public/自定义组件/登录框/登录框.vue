<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          用户名
        </label>
        <!-- Move v-model to the input element -->
        <input v-model="item.data.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="用户名">
        <p v-if="item.data.username_error_msg" class="text-red-500 text-xs italic">{{item.data.username_error_msg}}</p>

      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          密码
        </label>
        <!-- Move v-model to the input element -->
        <input v-model="item.data.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p v-if="item.data.password_error_msg" class="text-red-500 text-xs italic">{{item.data.password_error_msg}}</p>
      </div>
      <div class="flex items-center justify-between">
        <button
            @click="onSendEvent('登录按钮被点击',item.data)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          登录
        </button>
        <a
            @click="onSendEvent('忘记密码按钮被点击',item.data)"

            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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
function onSendEvent(name,data) {
  console.log("自定义组件",name,"发送数据", item.data);
  emits("CustomEvent",name,data);
}

</script>