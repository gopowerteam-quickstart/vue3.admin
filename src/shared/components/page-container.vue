<template lang="pug">
.page-container.absolute.inset-0.flex.flex-col
  .page-header-wrapper.flex.flex-row.justify-between.items-center.p-5(
    v-if='header')
    .page-title-wrapper
      .title {{ breadcrumbTitle }}
      .description {{ description }}
    .page-action-wrapper.flex.items-center.space-x-3
      slot(name='action')
      icon-icon-park-outline:return.cursor-pointer(
        @click='router.back()'
        v-if='canBack')
  .page-body-wrapper.flex-auto.relative.px-5.pt-2(
    :class='containerClass')
    slot
</template>

<style lang="less" scoped>
.page-header-wrapper {
  height: 60px;
  background: #fff;

  .title {
    font-weight: 500;
  }
  .description {
    font-size: 10px;
    padding: 3px 0;
    color: #b5b5c3;
  }
}

.page-body-wrapper {
  overflow: auto;
}
</style>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import type { PropType } from 'vue'
import { appConfig } from '~/config/app.config'
import { menuConfig } from '~/config/menu.config'
import { getCurrentMenuByPath } from '../utils/common.util'

const title = useTitle()
const route = useRoute()
const router = useRouter()

const props = defineProps({
  header: {
    type: Boolean,
    default: true
  },
  flex: {
    type: Boolean,
    default: false
  },
  flexDirection: {
    type: String as PropType<'row' | 'column'>,
    default: 'row'
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
})

const containerClass = {
  flex: props.flex,
  'flex-row': props.flexDirection === 'row',
  'flex-col': props.flexDirection === 'column'
}

const menus = getCurrentMenuByPath(menuConfig, route.path)

const pageTitle = computed(
  () => props.title || (route?.meta?.title as string)
)

function setHtmlTitle() {
  const defualtTitle = get(pageTitle)
  set(
    title,
    (defualtTitle ? defualtTitle + '-' : '') +
      appConfig.title
  )
}

const canBack = computed(() => !(menus && menus.length))

const breadcrumbTitle = computed(() => {
  const title = (menus || []).map(x => x.title).join(' / ')
  return get(title || pageTitle)
})

onMounted(() => {
  setHtmlTitle()
})
</script>
