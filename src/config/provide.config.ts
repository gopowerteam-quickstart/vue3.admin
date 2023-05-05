import type { NextStepExecutor } from '@/shared/hooks/use-step'

export const StepProvideKey = Symbol('InjectionKey') as InjectionKey<{

  dataSource: Map<string, any>
  onNextStep: (executor: NextStepExecutor) => void
}>
