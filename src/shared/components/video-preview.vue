<template>
  <div class="video-preview">
    <image-preview
      v-if="cover !== undefined"
      height="120px"
      :src="cover"
      width="150px"
    />
    <div class="w-150px h-120px flex flex-center">
      <icon-park-outline:video-file class="text-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface VideoInfo {
  src: string
  cover?: string
}

defineProps<VideoInfo>()
</script>
