<template lang="pug">
.video-preview
  image-preview(
    v-if='cover !== undefined'
    :src='cover'
    width='150px'
    height='120px')
  .w-150px.h-120px.flex.flex-center
    icon-park-outline:video-file.text-lg
</template>

<script lang="ts" setup>
type VideoInfo = {
  src: string
  cover?: string
}

defineProps<VideoInfo>()
</script>
