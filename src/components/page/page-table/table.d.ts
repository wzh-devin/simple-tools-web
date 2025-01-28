/**
 * 2025/1/28 16:24
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
export interface ITableConfig {
  pageName: string
  pageHeader: {
    title: string
    btnTitle: string
  }
  propList: []
  tableData: []
}

export interface ITableProps {
  tableConfig: ITableConfig
  otherInfo?: any
}
