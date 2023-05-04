<template>
  <div class="upload-container inline-block relative">
    <div class="upload-wrapper absolute inset-0">
      <input
        :accept="accept"
        class="upload-input h-full w-full"
        :multiple="multiple"
        type="file"
        @change="onFileChange"
      >
    </div>
    <div class="upload-content">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.upload-wrapper {
  z-index: 100;
  .upload-input {
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import { FileType } from '@/config/enum.config'

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    filetype?: string | FileType
  }>(),
  {
    multiple: false,
    filetype: '*',
  },
)

/**
 * 定义上传事件
 */
const emit = defineEmits({
  upload: (files: FileList) => files,
})

const accept = computed(() => {
  switch (props.filetype) {
    case FileType.Image:
      return 'image/*'
    case FileType.Video:
      return 'video/*'
    case FileType.Document:
      return 'application/*;text/*'
    default:
      return props.filetype
  }
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
