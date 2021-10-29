import { RequestParams } from '@gopowerteam/http-request'
import { appConfig } from '@/config/app.config'
import { useRequest } from 'virtual:http-request'
import { interval, Observable, retryWhen, zip } from 'rxjs'
import COS from 'cos-js-sdk-v5'
import { nanoid } from 'nanoid'

enum StorageType {
  COS = 'cos'
  // OSS = 'oss'
}

type StorageConfig = {
  bucket: string
  region: string
  type: StorageType
}

type COSCredential = {
  credentials: {
    sessionToken: string
    tmpSecretId: string
    tmpSecretKey: string
  }
  expiration: string
  expiredTime: number
  requestId: string
  startTime: number
}

type UploadResult = {
  url: string
  key: string
  filename: string
  filetype: string
}

interface IStorageService {
  pubObject(file: File): Promise<UploadResult>
}

function generateFileKey(fileObject: File) {
  const key = nanoid()
  const [suffix, ..._] = fileObject.name
    .split('.')
    .reverse()

  return `${key}${_ && _.length && '.' + suffix}`
}
/**
 * 公共函数
 */
export class CosService implements IStorageService {
  private readonly bucket!: string
  private readonly region!: string
  private readonly credential
  private readonly cos: COS
  private readonly config = {
    FileParallelLimit: 5, // 文件并发数
    ChunkParallelLimit: 8, // 同一个上传文件的分块并发数
    ChunkSize: 1024 * 1024 * 8 // 分块上传时，每块的字节数大小
  }

  constructor(
    { bucket, region }: StorageConfig,
    credential: COSCredential
  ) {
    this.bucket = bucket
    this.region = region
    this.credential = credential
    this.cos = this.createCosObject()
  }

  /**
   * 创建COS对象
   * @returns
   */
  private createCosObject() {
    return new COS({
      getAuthorization: (options, callback) => {
        callback({
          TmpSecretId:
            this.credential.credentials.tmpSecretId,
          TmpSecretKey:
            this.credential.credentials.tmpSecretKey,
          XCosSecurityToken:
            this.credential.credentials.sessionToken,
          StartTime: this.credential.startTime,
          ExpiredTime: this.credential.expiredTime
        })
      },
      ...this.config
    })
  }

  /**
   * 文件上传
   * @param fileObject
   */
  public pubObject(fileObject: File) {
    return new Promise<UploadResult>((reslove, rejcet) => {
      const key = generateFileKey(fileObject)
      this.cos.putObject(
        {
          Bucket: this.bucket,
          Region: this.region,
          StorageClass: 'STANDARD',
          Key: key,
          Body: fileObject // 上传文件对象
        },
        (err, data) => {
          if (err) {
            rejcet(err)
          } else {
            reslove({
              key,
              url: `https://${data.Location}`,
              filename: fileObject.name,
              filetype: fileObject.type
            })
          }
        }
      )
    })
  }
}

/**
 * 文件服务
 */
export class FileService {
  private readonly name: string

  private static storages: {
    [key: string]: IStorageService
  } = {}

  private getStorage() {
    return FileService.storages[this.name]
  }

  constructor(name: string) {
    this.name = name

    if (!FileService.storages[name]) {
      this.createStroageService(name)
    }
  }

  /**
   * 上传文件
   * TODO: 添加自动分片支持
   */
  upload(files: FileList) {
    const storage = this.getStorage()

    return new Observable<UploadResult>(subscribe => {
      if (!storage) {
        subscribe.error('未发现存储服务')
        return
      }

      if (files.length === 0) {
        subscribe.error('未发现待上传文件')
        return subscribe.complete()
      }

      Promise.all(
        Array.from(files).map(async file => {
          const result = await storage.pubObject(file)
          subscribe.next(result)
        })
      ).finally(() => {
        subscribe.complete()
      })
    }).pipe(
      retryWhen(errors => errors.pipe(() => interval(1000)))
    )
  }

  /**
   * 创建注册存储服务
   * @param name
   */
  private createStroageService(storage: string) {
    const storageService = useRequest(
      services => services.StorageService
    )

    // 获取存储服务
    const getStorageSerivceClass = (type: StorageType) => {
      const getServiceClass = {
        [StorageType.COS]: () => CosService
        // [StorageType.OSS]: () => OssService
      }[type]

      return getServiceClass()
    }

    // 生成Storage
    zip(
      storageService.getStorageConfig(
        new RequestParams({ append: { storage } })
      ),
      storageService.getStorageCredential(
        new RequestParams({ append: { storage } })
      )
    ).subscribe(([config, credential]) => {
      // 获取存储类
      const StorageClass = getStorageSerivceClass(
        config.type
      )

      // 记录存储实例
      FileService.storages[this.name] = new StorageClass(
        config,
        credential
      )
    })
  }
}

/**
 * 文件服务
 * @param select
 * @returns
 */
export function useFileService<T>(
  select: (
    services: {
      [k in typeof appConfig.storage[number]]: string
    }
  ) => string
) {
  const fileService = appConfig.storage.reduce(
    (result, v) => {
      return (result[v] = v), result
    },
    {} as {
      [k in typeof appConfig.storage[number]]: string
    }
  )

  return new FileService(select(fileService))
}
