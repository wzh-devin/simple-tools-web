<script setup lang="ts">
/**
 * 2025/1/22 16:21
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 表格组件封装
 * @version 1.0
 * @since 1.0
 */
import { computed, defineProps, ref } from 'vue'
import type { ITableProps } from '@/components/page/page-table/table'
import { dateFormat } from '@/utils/format.ts'
import TextCopy from '@/components/page/common/text-copy/text-copy.vue'

const props = defineProps<ITableProps>()
const emit = defineEmits([
  'edit',
  'delete',
  'selection-change',
  'handleChildTree'
])

// 使用计算属性来保持响应式
const tableData = computed(() => props.tableConfig.tableData)

const loading = ref<boolean>(false)

const textCopyRef = ref<InstanceType<typeof TextCopy>>()

// 处理多选变化
const handleSelectionChange = (selection: any[]) => {
  emit('selection-change', selection)
}

// 处理编辑
const handleEdit = (row: any) => {
  emit('edit', { ...row }) // 传递完整的行数据，包括 id
}

// 处理删除
const handleDelete = (row: any) => {
  emit('delete', { ...row }) // 传递完整的行数据，包括 id
}

// 执行跳转页面
const handleChildTree = (row: any) => {
  emit('handleChildTree', row)
}

const copyData = (
  data: string | any | undefined,
  type: DataType = DataType.TEXT
) => {
  if (DataType.TEXT === type) {
    textCopyRef.value?.textCopy(data)
  } else {
    textCopyRef.value?.objCopy(data)
  }
}

const readData = (type: DataType = DataType.TEXT) => {
  if (DataType.OBJ === type) {
    return textCopyRef.value?.objRead()
  }
  return textCopyRef.value?.textRead()
}

defineExpose({
  loading,
  copyData,
  readData
})
</script>

<template>
  <div class="table-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      :filter-multiple="false"
      element-loading-text="加载中..."
      element-loading-background="rgba(255, 255, 255, 0.8)"
      height="calc(100vh - 260px)"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择列 -->
      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed="left"
      />

      <el-table-column
        v-for="(column, index) in props.tableConfig.propList"
        :key="index"
        v-bind="column"
        :fixed="column?.fixed"
        :align="column?.align"
      >
        <template #default="{ row }">
          <template v-if="column.type === 'link'">
            <el-link type="primary" :href="row[column.prop]" target="_blank"
              >跳转
            </el-link>
            <text-copy ref="textCopyRef" :text="`${row[column.prop]}`" />
          </template>
          <template v-if="column.type === 'boolean'">
            <el-button
              :type="row.isActive === 1 ? 'success' : 'danger'"
              disabled
              size="small"
            >
              {{ row.isActive === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
          <template v-if="column.type === 'timer'">
            {{ dateFormat(row[column.prop]) }}
          </template>
          <template v-if="column.type === 'opera'">
            <el-button
              type="success"
              v-if="column.haveChild?.isShow"
              link
              @click="handleChildTree(row)"
              >{{ column.haveChild?.text }}
            </el-button>
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
  </div>
</template>

<style scoped lang="less">
.table-container {
  height: 100%;
  overflow: hidden;
  padding-bottom: 30px;
}

:deep(.el-table) {
  .el-table__body-wrapper {
    overflow-y: auto;
    margin-bottom: 12px;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #ddd;
    }

    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
    }
  }

  .el-table__row:last-child {
    td {
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 8px;
    }
  }
}
</style>
