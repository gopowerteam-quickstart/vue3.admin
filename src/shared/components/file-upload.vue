<template lang="pug">
.upload.inline-block
  .upload-wrapper.absolute.inset-0
    input.upload-input.h-full.w-full(
      :accept='accept'
      :multiple='multiple'
      @change='onFileChange'
      type='file')

  .upload-content
    slot
</template>

<script setup lang="ts">
// TODO: 限制上传文件类型
defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: '*'
  }
})

/**
 * 定义上传事件
 */
const emit = defineEmits({
  upload: (files: FileList) => files
})

/**
 * 监听上传事件
 */
const onFileChange = (event: Event) => {
  // 获取上传组件
  const target = event.target as HTMLInputElement
  // 获取上传文件对象
  const files = target.files as FileList
  // 发送上传事件
  emit('upload', files)
  // 重置上传组件
  target.value = ''
}
</script>

<style lang="less" scoped>
.upload {
  position: relative;
}

.upload-wrapper {
  z-index: 100;
  .upload-input {
    opacity: 0;
  }
}
</style>
