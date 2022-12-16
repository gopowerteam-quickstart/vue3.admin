<template lang="pug">
.media-gallery-item
  upload-progress(:task='task')
    .media-wrapper.flex-center
      .image-gallery-item(v-if='type === FileType.Image')
        image-preview(:width='width' :height='height' :src='task?.url || src')
  .action.flex.justify-end.space-x-2.p-1
    .remove(@click='emits("delete", src || task?.key || "")')
      icon-park-outline:delete.text-xs
</template>

<script setup lang="ts">
import { FileType } from '@/config/enum.config'
import type { UploadTask } from '../utils/upload.service'

const props = defineProps<{
  width?: string
  height?: string
  type: FileType
  task?: UploadTask
  src?: string
}>()

const emits = defineEmits({
  delete: (key: string) => key,
})

const mediaGallery = getRootCompoent()

const width = computed(() => {
  if (props.width) {
    return props.width
  }

  return mediaGallery?.props?.width
})

const height = computed(() => {
  if (props.height) {
    return props.height
  }

  return mediaGallery?.props?.height
})

function getRootCompoent() {
  const currentInstance = getCurrentInstance()

  let component = currentInstance?.parent

  while (component && component?.type?.name !== 'MediaGallery') {
    component = component.parent
  }

  return component
}
</script>

<style lang="less" scoped>
.media-gallery-item {
  position: relative;
  font-size: 0;
  .action {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    & > * {
      cursor: pointer;
    }
  }
  &:hover {
    .action {
      display: block;
    }
  }
}
.media-wrapper {
  overflow: hidden;
  width: v-bind(width);
  height: v-bind(height);
  background-color: rgb(0 0 0 / 10%);
}
</style>
