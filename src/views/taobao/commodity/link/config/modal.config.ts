import type { IModalConfig } from '@/components/page/page-modal/modal'

const modalConfig: IModalConfig = {
  pageName: 'link',
  header: {
    newTitle: '新增链接',
    editTitle: '修改链接'
  },
  formItems: [
    {
      type: 'input',
      prop: 'link',
      label: '链接地址',
      placeholder: '请输入链接地址'
    },
    {
      type: 'select',
      prop: 'operSys',
      label: '系统类型',
      placeholder: '请输入操作系统类型'
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '链接描述',
      placeholder: '请输入链接描述'
    }
  ]
}

export default modalConfig
