import { defineConfig } from 'windicss/helpers'
import * as R from 'ramda'

function generateFlex(start: number, end: number) {
  const generate = (
    x: { [key: string]: string },
    v: number
  ) => {
    x[v] = `${v} ${v} 0%`
    return x
  }

  return R.reduce(generate, {}, R.range(start, end))
}

export default defineConfig({
  darkMode: 'class',
  attributify: {
    prefix: 'css:'
  },
  alias: {
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col justify-center',
    'flex-row-center': 'flex flex-row justify-center'
  },
  theme: {
    flex: {
      auto: '1 1 auto',
      none: 'none',
      ...generateFlex(1, 13)
    }
  }
})
