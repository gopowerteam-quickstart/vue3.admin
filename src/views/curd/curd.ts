import { CrudOptions } from '@fast-crud/fast-crud'

export default function (): CrudOptions {
  const pageRequest = async () => {
    return await Promise.resolve({
      currentPage: 1,
      pageSize: 10,
      total: 2,
      records: [
        { id: 1, name: 'zhangsan1', age: '15' },
        { id: 1, name: 'zhangsan2', age: '15' },
        { id: 1, name: 'zhangsan3', age: '15' }
      ]
    })
  }

  const editRequest = async () => {
    return await Promise.resolve()
  }
  const delRequest = async () => {
    return await Promise.resolve()
  }

  const addRequest = async ({}) => {
    return await Promise.resolve()
  }
  return {
    //请求配置
    request: {
      pageRequest, // 列表数据请求
      addRequest, // 添加请求
      editRequest, // 修改请求
      delRequest // 删除请求
    },
    form: {
      wrapper: {
        is: 'a-drawer'
      }
    },
    columns: {
      id: {
        title: 'ID',
        key: 'id',
        type: 'number',
        column: {
          width: 50
        },
        form: {
          show: false
        }
      },
      name: {
        title: '姓名',
        type: 'text',
        search: {
          show: true
        }
      },
      age: {
        title: '年龄',
        type: 'text'
      }
    }
  }
}
