<template lang="pug">
.flex.flex-col.w-full
  img.image-style(:src='imageUrl' v-if='imageUrl')
  img.image-style(v-else)
</template>

<script setup lang="ts">
import { RequestParams } from '@gopowerteam/http-request'
import { useRequest } from 'virtual:http-request'
import { useFileService } from '~/shared/services/file.service'

const cosControllerService = useRequest(
  services => services.COSControllerService
)
const consultationRecordService = useRequest(
  services => services.ConsultationRecordService
)

const props = defineProps({
  objKey: {
    type: String,
    default: '',
    required: false
  },
  type: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})
const imageUrl = ref<string>()
//文件服务
const fileService = useFileService(
  services => services.private
)

/**
 * 上传照片
 * @param x
 */
function uploadFile(x: FileList) {
  fileService.upload(x).subscribe(data => {
    getPrivateUrl(data.key)
    uploadOralPhoto(data.key)
  })
}

/**
 * 通过key获取url
 * @param objKey
 */
function getPrivateUrl(objKey: string) {
  if (objKey) {
    cosControllerService
      .generateDefaultPrivateUrl(
        new RequestParams({
          append: {
            objectKey: objKey
          },
          force: true
        })
      )
      .subscribe(data => {
        console.log(33333, data.url)
        set(imageUrl, data.url)
      })
  }
}

/**
 * 上传照片
 */
function uploadOralPhoto(key: string) {
  consultationRecordService
    .uploadOralPhoto(
      new RequestParams({
        append: {
          id: props.id
        },
        data: {
          photoFile: key,
          photoType: props.type
        }
      })
    )
    .subscribe(data => {
      console.log(data)
    })
}

onMounted(() => {
  watch(
    () => props.objKey,
    () => {
      if (props.objKey) {
        getPrivateUrl(props.objKey)
      }
    }
  )
  console.log(22222, props.objKey)
  if (props.objKey) {
    getPrivateUrl(props.objKey)
  }
})
</script>

<style scoped>
.image-style {
  width: 100%;
  height: 200px;
  object-fit: none;
}
</style>
