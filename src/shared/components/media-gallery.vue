<template lang="pug">
.media-gallery
  a-image-preview-group(infinite)
    .flex.flex-wrap
      media-gallery-item.m-5px(
        v-for='media in medias'
        :key='media'
        :type='type'
        :src='media'
        @delete='onDeleteMedia')
      media-gallery-item.m-5px(
        v-for='task in tasks'
        :key='task.key'
        :task='task'
        :type='type'
        @delete='onDeleteTask')
      .upload-button(v-if='uploadButton')
        upload-container.m-5px(
          :multiple='multiple'
          :filetype='type'
          @upload='onAddMedia')
          .upload-button-wrapper.flex-center
            icon-park:plus.text-2xl
</template>

<script setup lang="ts">
import { FileType } from '@/config/enum.config'
import { useUploader } from '../hooks'
import type { UploadTask } from '../utils/upload.service'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    uploadButton?: boolean
    multiple?: boolean
    type?: FileType
    modelValue: string[]
  }>(),
  {
    multiple: false,
    uploadButton: true,
    width: '150px',
    height: '150px',
    type: FileType.Image,
  },
)

const uploader = useUploader()
let tasks = $shallowRef<UploadTask[]>([])
let medias = $ref<string[]>([...props.modelValue])

// 需要导出tasks的所有上传状态
defineExpose({
  uploaded: () => tasks.every((x) => x.completed.value === true),
})

const emit = defineEmits(['update:modelValue'])
useVModel(props, 'modelValue', emit)

const width = toRef(props, 'width')
const height = toRef(props, 'height')

/**
 * 添加媒体
 */
function onAddMedia(files: FileList) {
  // 添加任务
  tasks = [...tasks, ...uploader.upload(files)]
  updateVModel()
}

/**
 * 删除媒体
 * @param key
 */
function onDeleteMedia(key: string) {
  medias = medias.filter((media) => media !== key)
  updateVModel()
}

/**
 * 删除任务
 */
function onDeleteTask(key: string) {
  tasks = tasks.filter((task) => task.key !== key)
  updateVModel()
}

/**
 * 更新VModel
 */
function updateVModel() {
  emit('update:modelValue', [...medias, ...tasks.map((x) => x.key)])
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'MediaGallery',
})
</script>

<style lang="less" scoped>
.upload-gallery {
  position: relative;
}
.upload-button-wrapper {
  width: v-bind(width);
  height: v-bind(height);
  border: dashed 1px rgb(0 0 0 / 10%);
}
</style>
