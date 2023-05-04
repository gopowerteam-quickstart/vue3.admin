<template>
  <div class="step-container space-y-4">
    <div class="step-header">
      <a-steps :current="stepIndex">
        <a-step
          v-for="(step, index) in steps"
          :key="index"
          :description="step.description"
          :title="step.title"
        />
      </a-steps>
    </div>
    <div class="step-content">
      <StepContent />
    </div>
    <div class="step-actions space-x-4 text-center">
      <a-button v-if="stepIndex > 1" type="primary" @click="onPrevStep">
        上一步
      </a-button>
      <a-button v-if="stepIndex < steps.length" type="primary" @click="onNextStep">
        下一步
      </a-button>
      <a-button v-if="stepIndex === steps.length" type="primary" @click="onNextStep">
        提交
      </a-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { Message } from '@arco-design/web-vue'
import type { NextStepExecutor } from '../hooks/use-step'
import { StepProvideKey } from '@/config/provide.config'

const emits = defineEmits({
  submit: (data: Record<string, any>) => data,
})

const instance = getCurrentInstance()

// 当前步骤
let stepIndex = $ref(1)

// 数据源
const dataSource = new Map<string, any>()

// 当前验证器
let currentStepValidator = $ref<NextStepExecutor>()

// 步骤列表
let steps = $ref<
  {
    key: string
    title: string
    description: string
    component: VNode
  }[]
>([])

/**
 * 返回StepCOntent
 */
const StepContent = () => {
  if (steps.length)
    return steps[stepIndex - 1]?.component
}

/**
 * 初始化StepContainer
 */
function initSteps() {
  const slot = instance?.slots.default
  const nodes = (slot && slot()) || []

  steps = nodes.map((node) => {
    const key = (node.props?.stepKey || node.props?.['step-key']) as string
    const vnode = h(node, { key })

    return {
      key,
      title: node.props?.title as string,
      description: node.props?.description as string,
      component: vnode,
    }
  })
}

function onPrevStep() {
  stepIndex -= 1
}

async function onNextStep() {
  if (!currentStepValidator)
    return

  new Promise(currentStepValidator)
    .then((data) => {
      if (data && typeof data === 'object')
        dataSource.set(steps[stepIndex - 1].key, data)

      if (stepIndex < steps.length) {
        currentStepValidator = undefined
        stepIndex += 1
      }
      else {
        emits('submit', Object.fromEntries(dataSource))
      }
    })
    .catch((message) => {
      Message.error(message)
    })
}

provide(StepProvideKey, {
  dataSource,
  onNextStep: validate => (currentStepValidator = validate),
})

onMounted(() => {
  initSteps()
})
</script>
