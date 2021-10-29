declare module 'virtual:http-request' {
  import { AppService } from '~/http/services/authorization-service/app.service'
  import { StorageService } from '~/http/services/authorization-service/storage.service'
  const serviceList = {
    AppService,
    StorageService
  }

  export function useRequest<T>(
    select: (services: typeof serviceList) => { new (): T }
  ): T
}
