/**
 * 2025/2/2 19:16
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 接口类型管理
 * @version 1.0
 * @since 1.0
 */

interface categoryItemDto {
  categoryItemId: string
  categoryId: string
  categoryName: string
  categoryItemName: string
  categoryItemDesc: string
  isActive: number
}

export interface ICommodity {
  commodityId?: string
  commodityName: string
  commodityDesc?: string
  isActive?: number
  categoryName?: string
  categoryItemId: string
  categoryItemName?: string
  categoryItemDesc?: string
  categoryItemDto?: categoryItemDto
}

export interface ICommodityState {
  commodityList: ICommodity[]
}
