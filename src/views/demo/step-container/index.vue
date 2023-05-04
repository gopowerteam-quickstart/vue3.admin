<template>
  <page-container>
    <step-container @submit="onSubmit">
      <step-item step-key="product1" title="步骤1">
        <step1 />
      </step-item>
      <step-item step-key="product2" title="步骤2">
        <step2 />
      </step-item>
      <step-item step-key="product3" title="步骤3">
        <step3 />
      </step-item>
    </step-container>
  </page-container>
</template>

<script lang="ts" setup>
import Step1 from './components/step1.vue'
import Step2 from './components/step2.vue'
import Step3 from './components/step3.vue'

function onSubmit(data: any) {
  // eslint-disable-next-line no-console
  console.log(data)
}
</script>

<route lang="yaml">
name: step-container-demo
meta:
  layout: workspace
  requireAuth: true
  title: step-container示例
  menu:
    key: demo.step-container-demo
    icon: image-1.png
    title: StepContainer
</route>
