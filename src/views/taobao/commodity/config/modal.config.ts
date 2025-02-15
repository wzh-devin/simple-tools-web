import type { IModalConfig } from '@/components/page/page-modal/modal'
import useCategoryStore from '@/stores/taobao/category/category.ts'

const categoryStore = useCategoryStore()

const modalConfig: IModalConfig = {
  pageName: 'commodity',
  header: {
    newTitle: '新增商品',
    editTitle: '修改商品'
  },
  formItems: [
    {
      type: 'input',
      prop: 'commodityName',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      type: 'select',
      prop: 'categoryItemId',
      label: '二级类目'
    },
    {
      type: 'textarea',
      prop: 'commodityDesc',
      label: '商品描述',
      placeholder: '请输入商品描述'
    }
  ]
}

export default modalConfig
