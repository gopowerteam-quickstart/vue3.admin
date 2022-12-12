import components from 'unplugin-vue-components/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default components({
  dts: 'src/types/components.d.ts',
  resolvers: [
    ArcoResolver({
      sideEffect: true,
    }),
    iconsResolver({
      prefix: 'icon',
      alias: {
        park: 'icon-park',
        'park-outline': 'icon-park-outline',
      },
      enabledCollections: ['icon-park', 'icon-park-outline'],
    }),
  ],
  include: [/\.vue$/, /\.vue\?vue/],
})
