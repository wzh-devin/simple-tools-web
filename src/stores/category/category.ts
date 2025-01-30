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
  deleteCategory,
  editCategory,
  getCategoryAllList,
  getCategoryItems,
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
        const res = await getCategoryItems(categoryId)
        this.categoryItems = res.data
      } catch (error) {
        console.error('获取子类目列表失败:', error)
        throw error
      }
    }
  }
})

export default useCategoryStore
