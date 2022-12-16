<template lang="pug">
.upload-progress.relative
  Transition
    .progress.flex.flex-center(v-if='task && !task?.completed') {{ task?.progress }}%

  slot
</template>

<script setup lang="ts">
import type { UploadTask } from '../utils/upload.service'

defineProps<{
  task?: UploadTask
}>()
</script>

<style lang="less" scoped>
.upload-progress {
  display: inline-block;
  font-size: 0;
}
.progress {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 50px;
  height: 30px;
  font-size: 10px;
  border-radius: 15px 0 0;
  color: #ffffff;
  background-color: rgb(0 0 0 / 50%);
  transform: scale(0.8);
  transform-origin: 100% 100%;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition-delay: 5s;
}
</style>
