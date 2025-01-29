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
