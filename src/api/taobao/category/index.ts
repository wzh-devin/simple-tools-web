/**
 * 2025/1/19 15:51
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 类目管理API
 * @version 1.0
 * @since 1.0
 */
import { get, post } from '@/api/http'

export interface ICategoryReq {
  categoryId: number
  name: string
  description: string
  isActive: number
}

export interface ICategoryItemReq extends ICategoryReq {
  itemId: number
}

/**
 * 获取淘宝的所有类目
 */
export function getCategoryAllList() {
  return get({
    url: '/taobao/category/getAll'
  })
}

/**
 * 根据参数类型获取类目
 */
export function getCategoryListByParams(data: ICategoryReq) {
  return post({
    url: '/taobao/category/getListByParams',
    data
  })
}

/**
 * 新增类目
 */
export function addCategory(data: ICategoryReq) {
  console.log('data', data)
  return post({
    url: '/taobao/category/addCategory',
    data
  })
}

/**
 * 修改类目
 */
export function editCategory(data: ICategoryReq) {
  try {
    return post({
      url: '/taobao/category/editCategory',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 删除类目
 */
export async function deleteCategory(id: number) {
  try {
    await post({
      url: `/taobao/category/deleteCategory?id=${id}`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 获取二级类目
 */
export async function getCategoryItems(id?: string | number) {
  try {
    if (id) {
      return await get({
        url: `/taobao/category/getCategoryItemsId?id=${id}`
      })
    }
    return await get({
      url: `/taobao/category/getCategoryItems`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 新增二级类目
 */
export async function addCategoryItem(data: ICategoryItemReq) {
  try {
    await post({
      url: '/taobao/category/addCategoryItem',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 修改二级类目
 */
export async function editCategoryItem(data: ICategoryItemReq) {
  try {
    await post({
      url: '/taobao/category/editCategoryItem',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 删除二级类目
 */
export async function deleteCategoryItem(id: number) {
  try {
    await post({
      url: `/taobao/category/deleteCategoryItem?id=${id}`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
