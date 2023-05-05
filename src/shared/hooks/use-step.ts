import { StepProvideKey } from '@/config/provide.config'

export type NextStepExecutor = (
  resolve: (

    value: boolean | undefined | Record<string, any> | void,
  ) => void,
  reject: (reason?: string) => void,
) => void

export function useStep() {
  const dataSource
  // 获取数据源

    = inject(StepProvideKey)?.dataSource || new Map<string, any>()

  const onNextStep
    // 获取下一步操作
    = inject(StepProvideKey)?.onNextStep || (() => undefined)

  return {
    dataSource,
    onNextStep,
  }
}
