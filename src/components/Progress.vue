<template>
  <div class="progress-container">
    <svg class="progress-svg" viewBox="0 0 100 100">
      <circle class="progress-background" cx="50" cy="50" r="45" fill="transparent" />
      <circle
        :class="{ 'progress-fill': true, active: percentage > 0 }"
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeOffset"
      />
    </svg>
    <div class="progress-text">
      <div class="title">进度</div>
      <div class="num">{{ percentage }}%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    percentage: number
  }>(),
  {
    percentage: 0
  }
)

const circumference = 2 * Math.PI * 45 // 圆的周长

const strokeOffset = computed(() => {
  const offset = circumference - (circumference * props.percentage) / 100
  return offset
})
</script>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.progress-svg {
  width: 100px;
  height: 100px;
}

.progress-background {
  stroke: #ccc;
  stroke-width: 10;
}

.progress-fill {
  stroke: #3d83dd;
  stroke-width: 10;
  transition: stroke-dashoffset 0.3s ease-in-out;
}

.active {
  animation: progress-fill 1s ease-in-out forwards;
}

@keyframes progress-fill {
  from {
    stroke-dashoffset: circumference;
  }
  to {
    stroke-dashoffset: strokeOffset;
  }
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-size: 14px;
    color: #333;
  }
  .num {
    font-size: 16px;
    color: #333;
  }
}
</style>
