type Constructor<T> = new (...args: unknown[]) => T

export function useInstance<T>(
  InstanceClass: Constructor<T>,
  params?: unknown,
): T {
  // TODO: 是否做依赖注入采集
  const instance = new InstanceClass(params)

  return instance
}
