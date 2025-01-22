<script setup lang="ts">
/**
 * 2025/1/22 16:21
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 表格组件
 * @version 1.0
 * @since 1.0
 */
import { dateFormat } from '@/utils/format.ts'
import type { ICategory } from '@/stores/category/i-category'
import { onMounted, ref } from 'vue'
import useCategoryStore from '@/stores/category/category.ts'
import { storeToRefs } from 'pinia'
import categoryConfig from '@/views/taobao/category/config/category.config.ts'

// 组件挂载的时候，执行
onMounted(() => {
  initTableData()
})

const categoryStore = useCategoryStore()

// 获取category列表数据
const { categoryList } = storeToRefs(categoryStore)
// 添加加载状态
const loading = ref(true)

// 初始化表格数据
const initTableData = () => {
  // 发送请求
  categoryStore.getCategoryListAction()
  loading.value = false
}

// 处理编辑
const handleEdit = (row: ICategory) => {
  console.log('编辑', row)
}

// 处理删除
const handleDelete = (row: ICategory) => {
  console.log('删除', row)
}
</script>

<template>
  <el-table
    v-loading="loading"
    :data="categoryList"
    border
    style="width: 100%"
    :filter-multiple="false"
    element-loading-text="加载中..."
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <el-table-column
      v-for="(column, index) in categoryConfig.propsList"
      :key="index"
      v-bind="column"
    >
      <template #default="{ row }">
        <template v-if="column.type === 'timer'">
          {{ dateFormat(row[column.prop as keyof ICategory]) }}
        </template>
        <template v-if="column.type === 'opera'">
          <el-button type="success" link>查看子类目</el-button>
          <el-button type="primary" link @click="handleEdit(row)"
            >编辑
          </el-button>
          <el-button type="danger" link @click="handleDelete(row)"
            >删除
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="less"></style>
