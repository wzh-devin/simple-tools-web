/**
 * 2025/2/2 19:14
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 商品信息的管理
 * @version 1.0
 * @since 1.0
 */
import { defineStore } from 'pinia'
import type {
  ICommodity,
  ICommodityState
} from '@/stores/commodity/i-commodity'
import {
  addCommodity,
  deleteCommodity,
  editCommodity,
  getCommodityAllInfo
} from '@/api/taobao/commodity'

const useCommodityStore = defineStore('commodity', {
  state: (): ICommodityState => ({
    commodityList: []
  }),
  actions: {
    // 获取所有的商品信息
    async getCommodityAllInfoAction() {
      this.commodityList = (await getCommodityAllInfo()).data.map(
        (commodity: ICommodity) => {
          const { categoryItemDto, ...rest } = commodity
          return {
            ...rest,
            categoryName: categoryItemDto?.categoryName,
            categoryItemId: categoryItemDto?.categoryItemId,
            categoryItemName: categoryItemDto?.categoryItemName,
            categoryItemDesc: categoryItemDto?.categoryItemDesc
          }
        }
      )
    },
    // 新增商品
    async addCommodityAction(data: ICommodity) {
      try {
        await addCommodity(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 修改商品
    async editCommodityAction(data: ICommodity) {
      try {
        await editCommodity(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 删除商品
    async deleteCommodityAction(commodityId: string | number | undefined) {
      try {
        await deleteCommodity(commodityId)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

export default useCommodityStore
