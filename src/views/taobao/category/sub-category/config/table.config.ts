import type { ITableConfig } from '@/components/page/page-table/table'

const tableConfig: ITableConfig = {
  pageName: 'table',
  pageHeader: {
    title: '子类目列表',
    btnTitle: '新增子类目'
  },
  propList: [
    {
      prop: 'name',
      label: '子类目名称',
      align: 'center'
    },
    {
      prop: 'description',
      label: '子类目描述',
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
      haveChild: false // 子类目不需要"查看子类目"按钮
    }
  ],
  tableData: []
}

export default tableConfig
