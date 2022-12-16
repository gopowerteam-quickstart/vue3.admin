import { UploadService } from '../utils/upload.service'
import { useInstance } from './use-instance'

export const useUploader = () => useInstance(UploadService, name)
