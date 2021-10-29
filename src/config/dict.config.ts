import { defineDict } from '~/shared/utils/dict.util'

export default {
  // 字典定义
  YesNo: defineDict([
    [0, '是'],
    [1, '否']
  ]),
  Enable: defineDict([
    [0, '停用'],
    [1, '启用']
  ])
}
