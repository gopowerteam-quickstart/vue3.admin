import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import lessToJs from 'less-vars-to-js'
import type { CSSOptions } from 'vite'
import { fileURLToPath } from 'node:url'

// 全局样式变量
const globalLessVars = resolve(
  fileURLToPath(new URL('../src/styles/variables.less', import.meta.url)),
)
const globalLessTheme = resolve(
  fileURLToPath(new URL('../src/styles/theme.less', import.meta.url)),
)

const themeVars = lessToJs(readFileSync(globalLessTheme, 'utf8'), {
  resolveVariables: true,
  stripPrefix: true,
})

export function defineViteCSS(
  options: CSSOptions = {},
): Record<'css', CSSOptions> {
  return {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${globalLessVars}";`,
          modifyVars: themeVars,
          javascriptEnabled: true,
        },
      },
      ...options,
    },
  }
}
