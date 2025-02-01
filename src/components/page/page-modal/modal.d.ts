/**
 * 2025/1/22 21:02
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
export interface IModalConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: Array<{
    type: string
    label: string
    prop: string
    placeholder?: string
    initValue?: any
    align?: string
  }>
}

export interface IModalProps {
  modalConfig: IModalConfig
  otherInfo?: any
}
