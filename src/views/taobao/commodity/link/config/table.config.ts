import type { ITableConfig } from '@/components/page/page-table/table'

const tableConfig: ITableConfig = {
  pageName: 'table',
  pageHeader: {
    title: '链接列表',
    btnTitle: '新增链接'
  },
  propList: [
    {
      type: 'link',
      prop: 'link',
      label: '商品链接',
      align: 'center'
    },
    {
      prop: 'operSys',
      label: '操作系统',
      align: 'center'
    },
    {
      prop: 'description',
      label: '链接描述',
      align: 'center'
    },
    {
      type: 'boolean',
      prop: 'isActive',
      label: '是否启用',
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
        isShow: false
      }
    }
  ],
  tableData: []
}

export default tableConfig
