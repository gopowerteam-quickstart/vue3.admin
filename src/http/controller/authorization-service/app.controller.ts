/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { RequestMethod } from '@gopowerteam/http-request'

// 控制器名称
const controller = 'app'
const service = ''
const gateway = 'authorization'

export const AppController = {
    // 获取扫码登录地址
    getQrConnectUrl: {
        gateway,
        service,
        controller,
        path: '/app/qr-connect/{app}',
        action: 'getQrConnectUrl',
        type: RequestMethod.Get
    },
    // 获取授权路径
    authorize: {
        gateway,
        service,
        controller,
        path: '/app/authorize/{app}',
        action: 'authorize',
        type: RequestMethod.Get
    },
    // 获取JSConfig配置
    jsConfig: {
        gateway,
        service,
        controller,
        path: '/app/js-config/{app}',
        action: 'jsConfig',
        type: RequestMethod.Get
    },
    // 获取App配置
    getConfig: {
        gateway,
        service,
        controller,
        path: '/app/config/{app}',
        action: 'getConfig',
        type: RequestMethod.Get
    }
}
