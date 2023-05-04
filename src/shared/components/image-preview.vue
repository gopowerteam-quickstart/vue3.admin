<template>
  <div class="image-preview">
    <a-image :preview="preview" show-loader :src="url" />
  </div>
</template>

<style lang="less" scoped>
.image-preview {
  position: relative;
  display: inline-block;
  font-size: 0;
  :deep(img.arco-image-img) {
    max-width: v-bind(width);
    max-height: v-bind(height);
  }
}
</style>

<script setup lang="ts">
import { asyncComputed } from '@vueuse/core'
import { DisplayScene } from '@/config/enum.config'

const props = withDefaults(
  defineProps<{
    src?: string
    scene?: DisplayScene
    width?: string | number
    height?: number | string
    preview?: boolean
    rotate?: boolean
  }>(),
  {
    preview: true,
    rotate: false,
    width: 'auto',
    height: 'auto',
    src: '',
    scene: DisplayScene.Normal,
    title: '',
    description: '',
  },
)

function getImageSuffix(scene: DisplayScene) {
  // TODO:获取图片样式

  return scene === DisplayScene.Normal ? '' : ''
}

/**
 * 获取图片相应地址
 * @param key
 * @param scene
 */
function getImageUrl(key: string, scene: DisplayScene) {
  // TODO: 配置七牛域名
  const qiniuDomain = ''

  // 获取样式后缀
  const suffix = getImageSuffix(scene)

  return `https://${qiniuDomain}/${key}${suffix}`
}

/**
 * 获取地址URL
 */
const url = asyncComputed(
  async () => {
    const prefixs = ['blob:', 'http://', 'https://']

    if (prefixs.some(prefix => props.src.startsWith(prefix)))
      return props.src
    else
      return getImageUrl(props.src, props.scene)
  },
  '',
  {
    lazy: true,
  },
)
</script>
