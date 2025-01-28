import type { IModalConfig } from '@/components/page/page-modal/modal'

/**
 * 2025/1/22 17:42
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
const modalConfig: IModalConfig = {
  pageName: 'category',
  header: {
    newTitle: '新增类目',
    editTitle: '修改类目'
  },
  formItems: [
    {
      type: 'input',
      prop: 'categoryName',
      label: '类目名称',
      align: 'center'
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '类目描述',
      align: 'center'
    }
  ],
  options: []
}
export default modalConfig
