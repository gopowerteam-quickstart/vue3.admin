<template>
  <PageContainer space>
    <a-card title="iconify">
      <a-space>
        <icon-park-outline:people />
        <icon-park-outline:people class="text-xl" />
        <icon-park-outline:people class="text-2xl" />
        <icon-park-outline:people class="text-3xl" />
        <icon-park-outline:people class="text-4xl" />
      </a-space>
    </a-card>
    <a-card title="image-icon">
      <a-space>
        <ImageIcon name="image-1" />
        <ImageIcon name="image-1" :size="30" />
        <ImageIcon name="image-1" :size="40" />
        <ImageIcon name="image-1" :size="50" />
      </a-space>
    </a-card>
    <a-card title="image-icon">
      <a-space>
        <SvgIcon name="icon-1" />
        <SvgIcon name="icon-1" :size="30" />
        <SvgIcon name="icon-1" :size="40" />
        <SvgIcon name="icon-1" :size="50" />
      </a-space>
    </a-card>
  </PageContainer>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
name: icon-demo
meta:
  layout: workspace
  requireAuth: true
  title: icon示例
  menu:
    key: demo.icon-demo
    icon: image-1.png
    title: Icon
</route>
