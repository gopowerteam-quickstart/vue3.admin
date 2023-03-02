import { StepProvideKey } from '@/config/provide.config'

export type NextStepExecutor = (
  resolve: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: boolean | undefined | Record<string, any> | void,
  ) => void,
  reject: (reason?: string) => void,
) => void

export function useStep() {
  const dataSource =
    // 获取数据源
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inject(StepProvideKey)?.dataSource || new Map<string, any>()

  const onNextStep =
    // 获取下一步操作
    inject(StepProvideKey)?.onNextStep || (() => void 0)

  return {
    dataSource,
    onNextStep,
  }
}
