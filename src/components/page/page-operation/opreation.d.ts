/**
 * 2025/2/2 15:03
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
export interface IOperationConfig {
  pageName: string
  searchDtl?: {
    searchData: string
    placeholder?: string
  }
  btns?: Array<{
    type?: string
    text?: string
    icon?: string
  }>
}

export interface IOperationProps {
  operationConfig: IOperationConfig
  otherInfo?: any
}
