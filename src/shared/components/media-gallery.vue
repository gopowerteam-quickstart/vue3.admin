<template>
  <div class="media-gallery">
    <a-image-preview-group infinite>
      <div class="flex flex-wrap">
        <media-gallery-item
          v-for="media in medias"
          :key="media"
          class="m-5px"
          :src="media"
          :type="type"
          @delete="onDeleteMedia"
        />
        <media-gallery-item
          v-for="task in tasks"
          :key="task.key"
          class="m-5px"
          :task="task"
          :type="type"
          @delete="onDeleteTask"
        />
        <div v-if="uploadButton" class="upload-button">
          <upload-container
            class="m-5px"
            :filetype="type"
            :multiple="multiple"
            @upload="onAddMedia"
          >
            <div class="upload-button-wrapper flex-center">
              <icon-park:plus class="text-2xl" />
            </div>
          </upload-container>
        </div>
      </div>
    </a-image-preview-group>
  </div>
</template>

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

<script setup lang="ts">
import { useUploader } from '../hooks'
import type { UploadTask } from '../utils/upload.service'
import { FileType } from '@/config/enum.config'

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

const emit = defineEmits(['update:modelValue'])
const uploader = useUploader()
let tasks = $shallowRef<UploadTask[]>([])
let medias = $ref<string[]>([...props.modelValue])

// 需要导出tasks的所有上传状态
defineExpose({
  uploaded: () => tasks.every(x => x.completed.value === true),
})

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
  medias = medias.filter(media => media !== key)
  updateVModel()
}

/**
 * 删除任务
 */
function onDeleteTask(key: string) {
  tasks = tasks.filter(task => task.key !== key)
  updateVModel()
}

/**
 * 更新VModel
 */
function updateVModel() {
  emit('update:modelValue', [...medias, ...tasks.map(x => x.key)])
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'MediaGallery',
})
</script>
