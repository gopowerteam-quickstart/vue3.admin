<template lang="pug">
.data-table-footer.text-right
  a-pagination.py-5(
    :page-size-options='page.pageSizeOpts'
    :total='page.total.value'
    @change='onLoadData'
    @showSizeChange='onLoadData'
    showSizeChanger
    v-model:current='page.pageIndex.value'
    v-model:page-size='page.pageSize.value')
</template>

<script setup lang="ts">
import { PageService } from '~/http/extends/page.service'

const onLoadData = inject('on-load-data') as () => void

interface Props {
  // 表单配置
  page: PageService
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.data-table-footer {
  margin-right: -8px;
}
</style>
