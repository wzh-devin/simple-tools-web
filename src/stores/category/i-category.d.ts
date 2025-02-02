/**
 * 2025/1/22 16:40
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 类目类型
 * @version 1.0
 * @since 1.0
 */
export interface ICategory {
  id: number
  name: string
  parentId?: number
  description: string
  isActive: number
  createTime: string
  updateTime: string
}

export interface ISelectData {
  label: string
  value: number | string
}

export interface ICategoryState {
  categoryList: ICategory[]
  categoryItems: ICategory[]
  selectedRows: ICategory[]
  selectData?: ISelectData[]
}
