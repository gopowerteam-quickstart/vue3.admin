declare module 'virtual:http-request' {
  import { PosterDownloadRecordService } from '~/http/services/material-service/poster-download-record.service.ts'
  import { PosterService } from '~/http/services/material-service/poster.service.ts'
  const serviceList = {
    PosterDownloadRecordService,
    PosterService
  }

  export function useRequest<T>(
    select: (services: typeof serviceList) => { new (): T }
  ): T
}
