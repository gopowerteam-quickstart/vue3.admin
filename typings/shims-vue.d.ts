declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_REQUEST_GATEWAY: string
}

declare module 'virtual:http-request' {
  import { PosterDownloadRecordService } from '~/http/services/material-service/poster-download-record.service'
  import { PosterService } from '~/http/services/material-service/poster.service'

  const serviceList = {
    PosterDownloadRecordService,
    PosterService
  }

  export function useRequest<T>(
    select: (services: typeof serviceList) => { new (): T }
  ): T
}
