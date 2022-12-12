import type { PluginOption } from 'vite'
import unocss from './unocss'
import autoImport from './unplugin-auto-import'
import icons from './unplugin-icons'
import components from './unplugin-vue-components'
import pages from './vite-plugin-pages'
import layouts from './vite-plugin-vue-layouts'
import macros from './vue-macros'

/**
 * DefineVitePlugins
 * @param plugins
 * @returns
 */
export function defineVitePlugins(
  plugins: PluginOption[] = [],
): Record<'plugins', PluginOption[]> {
  return {
    plugins: [
      macros,
      autoImport,
      pages,
      layouts,
      components,
      icons,
      unocss,
      ...plugins,
    ],
  }
}
