<template>
  <div class="media-gallery-item">
    <upload-progress :task="task">
      <div class="media-wrapper flex-center">
        <div v-if="type === FileType.Image" class="image-gallery-item">
          <image-preview :height="height" :src="task?.url || src" :width="width" />
        </div>
      </div>
    </upload-progress>
    <div class="action flex justify-end space-x-2 p-1">
      <div class="remove" @click="emits('delete', src || task?.key || '')">
        <icon-park-outline:delete class="text-xs" />
      </div>
    </div>
  </div>
</template>

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

<script setup lang="ts">
import type { UploadTask } from '../utils/upload.service'
import { FileType } from '@/config/enum.config'

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
  if (props.width)
    return props.width

  return mediaGallery?.props?.width
})

const height = computed(() => {
  if (props.height)
    return props.height

  return mediaGallery?.props?.height
})

function getRootCompoent() {
  const currentInstance = getCurrentInstance()

  let component = currentInstance?.parent

  while (component && component?.type?.name !== 'MediaGallery')
    component = component.parent

  return component
}
</script>
