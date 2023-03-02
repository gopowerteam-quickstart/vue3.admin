import type { NextStepExecutor } from '@/shared/hooks/use-step'

export const StepProvideKey = Symbol() as InjectionKey<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: Map<string, any>
  onNextStep: (executor: NextStepExecutor) => void
}>
