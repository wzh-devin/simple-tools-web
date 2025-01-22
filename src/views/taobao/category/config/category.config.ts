import type { ICategory } from '@/stores/category/i-category'
import { dateFormat } from '@/utils/format.ts'

/**
 * 2025/1/22 17:42
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
const categoryConfig = {
  pageName: 'category',
  propsList: [
    {
      type: 'selection',
      width: 55,
      align: 'center'
    },
    {
      prop: 'name',
      label: '类目名称',
      align: 'center'
    },
    {
      prop: 'description',
      label: '类目描述',
      align: 'center'
    },
    {
      type: 'timer',
      prop: 'createTime',
      label: '创建时间',
      align: 'center',
      formatter: (row: ICategory) => dateFormat(row.createTime)
    },
    {
      type: 'timer',
      prop: 'updateTime',
      label: '更新时间',
      align: 'center',
      formatter: (row: ICategory) => dateFormat(row.updateTime)
    },
    {
      type: 'opera',
      label: '操作',
      align: 'center',
      width: 200,
      fixed: 'right'
    }
  ]
}

export default categoryConfig
