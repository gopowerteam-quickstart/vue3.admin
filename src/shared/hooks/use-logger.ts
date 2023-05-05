import { LoggerService } from '../utils/logger.service'
import { useInstance } from '.'

export const useLogger = () => useInstance(LoggerService)
