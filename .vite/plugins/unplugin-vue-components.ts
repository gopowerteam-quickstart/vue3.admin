import components from 'unplugin-vue-components/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { DynamicTableResolver } from '@gopowerteam/vue-dynamic-table/resolver'
export default components({
  dts: 'src/types/components.d.ts',
  dirs: ['src/shared/components'],
  resolvers: [
    ArcoResolver({
      sideEffect: true,
      importStyle: 'less',
    }),
    iconsResolver({
      prefix: 'icon',
      alias: {
        park: 'icon-park',
        'park-outline': 'icon-park-outline',
      },
      enabledCollections: ['icon-park', 'icon-park-outline'],
    }),
    DynamicTableResolver({ componentName: 'DataTable' }),
  ],
  include: [/\.vue$/, /\.vue\?vue/],
})
