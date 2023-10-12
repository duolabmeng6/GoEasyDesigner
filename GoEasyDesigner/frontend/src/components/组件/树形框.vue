<template>
  <div :style="getItemStyle(item)">
    <el-tree
        ref="treeRef"
        :data="item.树形项目"
        :default-checked-keys="item.默认选中"
        :default-expanded-keys="item.默认展开"
        :node-key="item.id"
        :props="defaultProps"
        :show-checkbox="item.可选"
        style="width: 99%; height: 99%"
        @check-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import {getItemStyle} from '@/public.js';
import {ref} from 'vue';

export default {
  setup(props) {
    const treeRef = ref(null);
    const defaultProps = {
      children: 'children',
      label: 'label',
    };

    const handleSelectionChange = (val) => {
      props.item.选中项 = treeRef.value.getCheckedNodes(false, false);
      console.log(props.item.选中项)
    };

    return {
      getItemStyle,
      treeRef,
      defaultProps,
      handleSelectionChange,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
