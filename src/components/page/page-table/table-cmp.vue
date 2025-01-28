<script setup lang="ts">
/**
 * 2025/1/22 16:21
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 表格组件封装
 * @version 1.0
 * @since 1.0
 */
import type { ICategory } from '@/stores/category/i-category'
import { computed, defineProps, ref } from 'vue'
import type { ITableProps } from '@/components/page/page-table/table'
import { dateFormat } from '@/utils/format.ts'

const props = defineProps<ITableProps>()

// 使用计算属性来保持响应式
const tableData = computed(() => props.tableConfig.tableData)

// 加载状态
const loading = ref(true)

// 暴露加载状态给父组件
defineExpose({
  loading
})
</script>

<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    border
    style="width: 100%"
    :filter-multiple="false"
    element-loading-text="加载中..."
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <el-table-column
      v-for="(column, index) in props.tableConfig.propList"
      :key="index"
      v-bind="column"
      :fixed="column.fixed"
      :align="column.align"
    >
      <template #default="{ row }">
        <template v-if="column.type === 'boolean'">
          <el-button :type="row.isActive === 1 ? 'success' : 'danger'" disabled>
            {{ row.isActive === 1 ? '启用' : '禁用' }}
          </el-button>
        </template>
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
