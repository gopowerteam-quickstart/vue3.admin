import request from '@gopowerteam/request-generate/vite-plugin'

export default request({
  alias: '~',
  dir: 'src/http',
  dts: 'src/types/request.d.ts',
})
