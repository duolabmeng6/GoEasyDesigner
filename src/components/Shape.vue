<script setup>

</script>

<template>
  <div
      class="directional-dots-container"
  >
    <slot></slot>
    <div
        v-for="(direction, index) in directions"
        :key="index"
        :class="['dot', direction]"
        @mousedown="mousedown"
    ></div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
import {ref} from "vue";

export default {
  name: "DirectionalDots",
  setup() {
    const counter = useCounterStore()
    const canvasRef = ref(null);
    return {
      counter,
      canvasRef
    };
  },
  data() {
    return {
      directions: ["top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"],
    };
  },
  methods: {
    mousedown: function (e){
      // e.preventDefault()
      const downEvent = window.event
      downEvent.stopPropagation()
      downEvent.preventDefault()
      console.log("按下")
      this.counter.调整方向角标按下 = true


      const move = (moveEvent) => {
        const curPositon = {
          x: moveEvent.clientX ,
          y: moveEvent.clientY ,
        }
        console.log("移动",curPositon)

      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },


  }
};
</script>

<style>
.directional-dots-container {
  position: relative;
  display: inline-block;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #000;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
}

.top {
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  cursor: n-resize;
}

.bottom {
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  cursor: s-resize;
}

.left {
  top: 50%;
  left: -2px;
  transform: translateY(-50%);
  cursor: w-resize;
}

.right {
  top: 50%;
  right: -2px;
  transform: translateY(-50%);
  cursor: e-resize;
}

.top-left {
  top: -2px;
  left: -2px;
  cursor: nw-resize;
}

.top-right {
  top: -2px;
  right: -2px;
  cursor: ne-resize;
}

.bottom-left {
  bottom: -2px;
  left: -2px;
  cursor: sw-resize;
}

.bottom-right {
  bottom: -2px;
  right: -2px;
  cursor: se-resize;
}
</style>