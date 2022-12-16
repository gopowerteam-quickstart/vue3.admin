import { nanoid } from 'nanoid/non-secure'
import { useLogger } from '../hooks/use-logger'
import * as qiniu from 'qiniu-js'
import { FileType } from '@/config/enum.config'

// 文件服务接口
interface IStorageService {
  putObject(uploadTask: UploadTask): void
}

/**
 * 生成待上传文件Key值
 * @param fileObject
 * @returns
 */
function generateFileKey(fileObject: File | string) {
  // JSSDK上传图片支持
  if (typeof fileObject === 'string') {
    return fileObject
  }

  // 直接返回KEY不需要保存后缀
  return nanoid()
}

export class UploadTask {
  private readonly abortListeners: ((key: string) => void)[] = []
  private readonly completeListeners: ((key: string) => void)[] = []

  public key: string
  public file: File
  // public path = ref('')
  public progress = ref(0)
  public completed = ref(false)
  public totalBytesSent = ref(0)
  public totalBytesExpectedToSend = ref(0)
  public meta: unknown

  public get type() {
    if (!this.file) return FileType.Other
    const imageSuffix = ['gif', 'jpeg', 'jpg', 'bmp', 'png']
    const videoSuffix = [
      'avi',
      'wmv',
      'mkv',
      'mp4',
      'mov',
      'rm',
      '3gp',
      'flv',
      'mpg',
      'rmvb',
    ]
    const documentSuffix = ['txt', 'doc', 'docx', 'ppt', 'xlsx']

    const checkSuffixType = (filename: string, suffixs: string[]) =>
      RegExp('.(' + suffixs.join('|') + ')$', 'i').test(filename.toLowerCase())

    switch (true) {
      case checkSuffixType(this.filename, imageSuffix):
        return FileType.Image
      case checkSuffixType(this.filename, videoSuffix):
        return FileType.Video
      case checkSuffixType(this.filename, documentSuffix):
        return FileType.Document
      default:
        return FileType.Other
    }
  }

  /**
   * 原始文件名
   */
  public get filename() {
    return this.file.name
  }

  public get url() {
    return URL.createObjectURL(this.file as File)
  }

  constructor(key: string, file: File) {
    this.key = key
    this.file = file
    // TODO
    // this.path.value = file['path'] ?? file
  }

  public updateProgress({
    progress,
    totalBytesSent,
    totalBytesExpectedToSend,
  }: {
    progress: number
    totalBytesSent: number
    totalBytesExpectedToSend: number
  }) {
    this.progress.value = Math.floor(progress)
    this.totalBytesSent.value = totalBytesSent
    this.totalBytesExpectedToSend.value = totalBytesExpectedToSend
  }

  public onAbort(callback: (key: string) => void) {
    this.abortListeners.push(callback)
    return this
  }

  public onComplete(callback: (key: string) => void) {
    this.completeListeners.push(callback)
    return this
  }

  public abort() {
    this.abortListeners.forEach((callback) => callback(this.key))
  }

  public done(key: string, meta?: unknown) {
    this.key = key
    this.meta = meta
    this.completed.value = true
    this.progress.value = 1
    this.completeListeners.forEach((callback) => callback(this.key))
  }
}

/**
 * 公共函数
 */
export class QiniuStorageService implements IStorageService {
  private token: string

  constructor() {
    this.requestToken()
  }

  private requestToken() {
    // TODO: 获取存储服务Token
  }

  /**
   * 文件上传
   * @param fileObject
   */
  public putObject(uploadTask: UploadTask) {
    qiniu
      .upload(uploadTask.file as File, uploadTask.key, this.token, {
        fname: uploadTask.filename,
      })
      .subscribe({
        next: ({
          total,
        }: {
          total: { percent: number; loaded: number; size: number }
        }) => {
          // TODO： 更新任务进度
          uploadTask.updateProgress({
            progress: total.percent,
            totalBytesSent: total.loaded,
            totalBytesExpectedToSend: total.size,
          })
        },
        complete: () => {
          uploadTask.done(uploadTask.key)
        },
        error: () => {
          uploadTask.abort()
        },
      })
  }
}

/**
 * 文件服务
 */
export class UploadService {
  private static storageService: IStorageService

  private getStorage() {
    return UploadService.storageService
  }

  constructor() {
    if (!UploadService.storageService) {
      this.createStroageService()
    }
  }

  /**
   * 上传文件
   */
  upload(files: FileList): UploadTask[] {
    const logger = useLogger()
    const storage = this.getStorage()

    // 进行数组统一处理
    const fileList = Array.from(files)

    // 检测存储服务状态
    if (!storage) {
      logger.error('未发现存储服务')
      return []
    }

    // 检查待上传文件列表
    if (fileList.length === 0) {
      logger.error('未发现待上传文件')
      return []
    }

    // 生成上传任务
    return fileList.map((file) => {
      // 创建上传文件Key
      const key = generateFileKey(file)
      // 创建上传任务
      const task = new UploadTask(key, file)
      // 上传操作
      storage.putObject(task)

      return task
    })
  }

  /**
   * 创建注册存储服务
   * @param name
   */
  private createStroageService() {
    // 使用七牛作为存储服务
    UploadService.storageService = new QiniuStorageService()
  }
}
