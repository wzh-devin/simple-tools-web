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
  ICommodityLink,
  ICommodityState
} from '@/stores/commodity/i-commodity'
import {
  addCommodity,
  addCommodityLink,
  deleteCommodity, deleteCommodityLinks,
  editCommodity, editCommodityLink,
  getCommodityAllInfo,
  getCommodityLinks
} from '@/api/taobao/commodity'

const useCommodityStore = defineStore('commodity', {
  state: (): ICommodityState => ({
    commodityList: [],
    commodityLinkList: []
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
    async deleteCommodityAction(commodityId: string | undefined) {
      try {
        await deleteCommodity(commodityId)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取商品链接信息
    async getCommodityLinksAction(commodityId: string | undefined) {
      try {
        const commodityLinksResult = await getCommodityLinks(commodityId)
        this.commodityLinkList = commodityLinksResult.data
      } catch (e) {
        return Promise.reject(e)
      }
    },
    // 新增商品链接
    async addCommodityLinkAction(data: ICommodityLink) {
      try {
        await addCommodityLink(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 修改商品链接
    async editCommodityLinkAction(data: ICommodityLink) {
      try {
        await editCommodityLink(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 删除商品链接
    async deleteCommodityLinksAction(linkIds: string[]) {
      try {
        await deleteCommodityLinks(linkIds)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

export default useCommodityStore
