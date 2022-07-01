import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'

export default defineConfig({
  //   variants: [
  //     (matcher) => {
  //       if (!matcher.startsWith('!')) return matcher
  //       return {
  //         matcher: matcher.slice(2),
  //         body: (body) => {
  //           body.forEach((v) => {
  //             if (v[1]) v[1] += ' !important'
  //           })
  //           return body
  //         },
  //       }
  //     },
  //   ],
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
    ['flex-center', 'flex justify-center items-center'],
  ],

  presets: [
    presetAttributify({
      prefix: 'css:',
      prefixedOnly: true,
      nonValuedAttribute: true,
    }),
    presetUno(),
  ],
  transformers: [transformerDirective()],
  // extractors: [extractorPug(), extractorSplit],
  theme: {
    colors: {
      primary: '#1f6ae3',
    },
  },
})
