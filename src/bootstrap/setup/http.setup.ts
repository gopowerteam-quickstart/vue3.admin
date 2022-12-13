import { AxiosAdapter } from '@gopowerteam/request/adapters'
import { Message } from '@arco-design/web-vue'

import {
  type AdapterResponse,
  type RequestPlugin,
  type RequestSendOptions,
  type ResponseInterceptor,
  setup,
} from '@gopowerteam/request'
import { appConfig } from '@/config/app.config'
import { TokenService } from '@/http/extends/token.service'

/**
 * 状态转换拦截器
 */
class StatusInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns {boolean} 执行状态
   */
  exec(response: AdapterResponse) {
    return response.status === 200
  }
}

/**
 * 成功状态转换拦截器
 */
class SuccessInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns  {any} 返回数据
   */
  exec(response: AdapterResponse) {
    return response.data
  }
}

/**
 * 错误转换拦截器
 */
class ErrorInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns {any} 返回数据
   */
  exec(response: AdapterResponse) {
    return response.data
  }
}

/**
 * 异常转换拦截器
 */
class ExceptionInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   */
  exec() {
    Message.info('系统内部错误，请稍后重试')
  }
}

/**
 *
 */
export default function () {
  // 配置服务端信息
  setup({
    // 使用根服务网关地址
    gateway: appConfig.http.gateway,
    adapter: new AxiosAdapter(),
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
    interceptors: {
      status: new StatusInterceptors(),
      success: new SuccessInterceptors(),
      error: new ErrorInterceptors(),
      exception: new ExceptionInterceptors(),
    },
    plugins: [new TokenService()],
  })
}
