/**
 * 2025/1/22 16:27
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
import { defineStore } from 'pinia'
import type { ICategoryState } from '@/stores/category/i-category'
import {
  addCategory,
  addCategoryItem,
  deleteCategory,
  deleteCategoryItem,
  editCategory,
  editCategoryItem,
  getCategoryAllList,
  getCategoryItems,
  type ICategoryItemReq,
  type ICategoryReq
} from '@/api/taobao/category'

const useCategoryStore = defineStore('category', {
  state: (): ICategoryState => ({
    categoryList: [],
    categoryItems: [],
    selectedRows: []
  }),
  actions: {
    // 获取所有类目列表
    async getCategoryListAction() {
      const categoryList = await getCategoryAllList()
      this.categoryList = categoryList.data
    },
    // 新增类目
    async addCategoryAction(data: ICategoryReq) {
      await addCategory(data)
    },
    // 修改类目
    async editCategoryAction(data: ICategoryReq) {
      await editCategory(data)
    },
    // 删除类目
    async deleteCategoryAction(id: number) {
      try {
        await deleteCategory(id)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取子类目列表
    async getCategoryItemsAction(categoryId: string | number) {
      try {
        const res = await getCategoryItems(Number(categoryId))
        this.categoryItems = res.data
      } catch (error) {
        console.error('获取子类目列表失败:', error)
        throw error
      }
    },
    async addCategoryItemAction(data: ICategoryItemReq) {
      try {
        await addCategoryItem(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async editCategoryItemAction(data: ICategoryItemReq) {
      try {
        await editCategoryItem(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteCategoryItemAction(id: number) {
      try {
        await deleteCategoryItem(id)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

export default useCategoryStore
