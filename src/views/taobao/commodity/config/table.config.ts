import type { ITableConfig } from '@/components/page/page-table/table'

const tableConfig: ITableConfig = {
  pageName: 'table',
  pageHeader: {
    title: '商品列表',
    btnTitle: '新增商品'
  },
  propList: [
    {
      prop: 'commodityName',
      label: '商品名称',
      align: 'center'
    },
    {
      prop: 'commodityDesc',
      label: '商品描述',
      align: 'center'
    },
    {
      prop: 'categoryName',
      label: '服务类型',
      align: 'center'
    },
    {
      prop: 'categoryItemName',
      label: '所属类目',
      align: 'center'
    },
    {
      type: 'boolean',
      prop: 'isActive',
      label: '是否上架',
      align: 'center'
    },
    {
      type: 'opera',
      prop: 'opera',
      label: '操作',
      align: 'center',
      fixed: 'right',
      haveChild: {
        text: '查看链接',
        isShow: true
      }
    }
  ],
  tableData: []
}

export default tableConfig
