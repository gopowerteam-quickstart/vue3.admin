import unocss from 'unocss/vite'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
import { presetAttributify, presetUno } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'

export default unocss({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'css:',
      prefixedOnly: true,
      nonValuedAttribute: true,
    }),
  ],
  transformers: [transformerDirective()],
  extractors: [extractorPug(), extractorSplit],
  theme: {
    colors: {
      primary: '#1f6ae3',
    },
  },
  shortcuts: [['flex-center', 'flex justify-center items-center']],
})
