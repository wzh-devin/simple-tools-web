/**
 * 2025/2/2 19:42
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 商品Api管理
 * @version 1.0
 * @since 1.0
 */

import { get, post } from '@/api/http'
import type { ICommodity, ICommodityLink } from '@/stores/taobao/commodity/i-commodity'

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
export async function deleteCommodity(
  commodityId: number | string | undefined
) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/deleteCommodity?commodityId=${commodityId}`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 获取商品链接
 * @param commodityId
 */
export async function getCommodityLinks(commodityId: string | undefined) {
  try {
    return get({
      url: `${COMMODITY_BASE_API}/getLinks?commodityId=${commodityId}`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 新增商品链接
 * @param data
 */
export async function addCommodityLink(data: ICommodityLink) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/addLink`,
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function editCommodityLink(data: ICommodityLink) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/editLink`,
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 删除商品链接
 * @param linkIds
 */
export async function deleteCommodityLinks(linkIds: any[]) {
  try {
    await post({
      url: `${COMMODITY_BASE_API}/deleteLinks`,
      data: linkIds
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
