interface CurrencyConfig {
  thousands: boolean
  sign: boolean
  scale: number
  precision: number
}

/**
 * 默认格式化配置
 */
const defaultConfig: CurrencyConfig = {
  thousands: false,
  sign: false,
  scale: 2,
  precision: 0,
}

/**
 * 货币显示处理
 * @param value
 * @param config
 * @returns
 */
export function currency(value: number, config?: Partial<CurrencyConfig>) {
  const currencyConfig: CurrencyConfig = {
    ...defaultConfig,
    ...(config || {}),
  }

  // 金额缩放处理
  value = value / Math.pow(10, currencyConfig.scale)

  // 返回格式化金额
  // TODO: 小程序中无法使用
  return value.toLocaleString('zh-CN', {
    useGrouping: currencyConfig.thousands,
    minimumFractionDigits: currencyConfig.precision,
    ...(currencyConfig.sign
      ? {
          currency: 'CNY',
          style: 'currency',
        }
      : {}),
  })
}

/** 真假值格式化
 * @params trueLabel 真值显示内容
 * @params falseLabel 假值显示内容
 */
export function yesNoFormat(trueLabel: string, falseLabel: string) {
  return (value?: boolean) => (value ? trueLabel : falseLabel)
}
