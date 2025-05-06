<template>
  <button
      v-show="item.visible"
      :disabled="item.disable"
      :class="buttonClasses"
  >
    {{ item.text }}
  </button>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  setup(props) {
    const buttonClasses = computed(() => {
      return [
        'px-4',
        'py-2',
        'text-white',
        'font-semibold',
        'shadow-sm',
        props.item.block ? 'block w-full' : 'inline-block',
        props.item.shape === 'rectangle' ? 'rounded' : '',
        props.item.shape === 'round' ? 'rounded-full' : '',
        props.item.shape === 'circle' ? 'rounded-full p-2' : '',
        props.item.theme === 'default' ? 'bg-gray-300 hover:bg-gray-400 focus-visible:outline-gray-500' : '',
        props.item.theme === 'primary' ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : '',
        props.item.theme === 'danger' ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600' : '',
        props.item.theme === 'warning' ? 'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600' : '',
        props.item.theme === 'success' ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600' : '',
        props.item.disable ? 'cursor-not-allowed opacity-50' : '',
        props.item.size === 'extra-small' ? 'px-1 py-0.5 text-xs' : '',
        props.item.size === 'small' ? 'px-2 py-1 text-xs' : '',
        props.item.size === 'medium' ? 'px-3 py-2 text-sm' : '',
        props.item.size === 'large' ? 'px-4 py-2.5 text-base' : '',
      ].join(' ');
    });

    return { buttonClasses };
  }
}
</script>
