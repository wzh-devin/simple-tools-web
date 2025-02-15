/**
 * 2025/1/28 16:17
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
import type { ITableConfig } from '@/components/page/page-table/table'

const tableConfig: ITableConfig = {
  pageName: 'table',
  pageHeader: {
    title: '类目列表',
    btnTitle: '新增类目'
  },
  propList: [
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
      type: 'boolean',
      prop: 'isActive',
      label: '是否激活',
      align: 'center'
    },
    {
      type: 'timer',
      prop: 'createTime',
      label: '创建时间',
      align: 'center'
    },
    {
      type: 'timer',
      prop: 'updateTime',
      label: '更新时间',
      align: 'center'
    },
    {
      type: 'opera',
      prop: 'opera',
      label: '操作',
      align: 'center',
      fixed: 'right',
      haveChild: {
        text: '查看子类目',
        isShow: true
      }
    }
  ],
  tableData: []
}

export default tableConfig
