<template lang="pug">
a-button(@click='onLink' type='link') {{ value }}
</template>

<script setup lang="ts">
import { useModal } from '@gopowerteam/vue-modal'
import type {
  ColumnRenderLinkConfig,
  RowParams
} from '../..'

const router = useRouter()
const modal = useModal()

interface Props {
  config: ColumnRenderLinkConfig
  params: RowParams
}

const props = defineProps<Props>()

// 获取数值字段
const value = computed<string>(() => {
  return props.params.record[
    props.params.column.key as string
  ]
})

function onLink() {
  // 关闭所有弹窗
  modal.closeAll()
  // 进行路由跳转
  router.push(props.config.router(props.params.record))
}
</script>
