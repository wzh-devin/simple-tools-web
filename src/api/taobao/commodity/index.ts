/**
 * 2025/2/2 19:42
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 商品Api管理
 * @version 1.0
 * @since 1.0
 */

import { get, post } from '@/api/http'
import type ICommodity from '@/stores/commodity/i-commodity'

const COMMODITY_BASE_API = '/taobao/commodity'

/**
 * 获取所有商品信息
 */
export async function getCommodityAllInfo() {
  try {
    return get({
      url: `${COMMODITY_BASE_API}/getAllInfo`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 新增商品信息
 * @param data
 */
export async function addCommodity(data: ICommodity) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/addCommodity`,
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 修改商品信息
 * @param data
 */
export async function editCommodity(data: ICommodity) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/editCommodity`,
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 删除商品信息
 * @param commodityId
 */
export async function deleteCommodity(commodityId: number | string) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/deleteCommodity?commodityId=${commodityId}`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
