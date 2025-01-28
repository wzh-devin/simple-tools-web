/**
 * 2025/1/22 16:27
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
import { defineStore } from 'pinia'
import type { ICategory, ICategoryState } from '@/stores/category/i-category'
import { addCategory, editCategory, getCategoryAllList, type ICategoryReq } from '@/api/taobao/category'

const useCategoryStore = defineStore('category', {
  state: (): ICategoryState => ({
    categoryList: [],
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
    }
  }
})

export default useCategoryStore
