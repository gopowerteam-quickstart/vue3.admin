<template lang="pug">
PageContainer(space)
  a-card(title='上传示例')
    upload-container(:filetype='FileType.Image' @upload='onUploadFile')
      a-button 上传图片
    image-preview(
      v-for='task in tasks'
      :key='task.key'
      width='200px'
      :src='task.url')
  a-card(title='画廊示例')
    media-gallery(v-model='photos' multiple)
</template>

<script setup lang="ts">
import type { UploadTask } from '@/shared/utils/upload.service'
import { FileType } from '@/config/enum.config'
import { useUploader } from '@/shared/hooks'

let photos = $ref<string[]>([])
let tasks = $shallowRef<UploadTask[]>([])

const uploader = useUploader()

/**
 * 上传文件
 */
function onUploadFile(files: FileList) {
  tasks = [...tasks, ...uploader.upload(files)]
}
</script>

<route lang="yaml">
name: uploader-demo
meta:
  layout: workspace
  requireAuth: true
  title: uploader示例
  menu:
    key: demo.uploader-demo
    icon: image-1.png
    title: Uploader
</route>
