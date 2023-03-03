<template lang="pug">
page-container
  step-container(@submit='onSubmit')
    step-item(title='步骤1' step-key='product1')
      step1
    step-item(title='步骤2' step-key='product2')
      step2
    step-item(title='步骤3' step-key='product3')
      step3
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
