<script setup lang="ts" name="SubCategoryManage">
/**
 * 2025/1/19 0:37
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 子类目管理
 * @version 1.0
 * @since 1.0
 */
import { computed, onMounted, ref, watch } from 'vue'
import useCategoryStore from '@/stores/taobao/category/category.ts'
import type ModalCmp from '@/components/page/page-modal/modal-cmp.vue'
import type TableCmp from '@/components/page/page-table/table-cmp.vue'
import tableConfig from './config/table.config'
import { storeToRefs } from 'pinia'
import type { ICategory } from '@/stores/taobao/category/i-category'
import { useRoute } from 'vue-router'
import modalConfig from '@/views/taobao/category/config/modal.config.ts'
import { ElMessage } from 'element-plus'
import operationConfig from '@/views/taobao/category/sub-category/config/operation.config.ts'

const route = useRoute()
const categoryId = route.query.categoryId as string

const categoryStore = useCategoryStore()
const { categoryItems } = storeToRefs(categoryStore)

const tableRef = ref<InstanceType<typeof TableCmp>>()
const modalRef = ref<InstanceType<typeof ModalCmp>>()

onMounted(async () => {
  if (categoryId) {
    await refreshTable()
  }
})

// 刷新
const refreshTable = async () => {
  if (categoryId) {
    await categoryStore.getCategoryItemsAction(categoryId)
  }
}

/**
 * 执行新增
 */
const handleAdd = () => {
  modalRef.value?.setModalVisible(true)
}

const modalConfigRef = computed(() => {
  return modalConfig
})

// 表格配置
const tableConfigRef = computed(() => {
  return {
    ...tableConfig,
    tableData: categoryItems.value || []
  }
})

const handleConfirm = async (formData: any) => {
  try {
    if (formData.id && formData.id !== '') {
      // 执行编辑操作
      await categoryStore.editCategoryItemAction({
        ...formData
      })
    } else {
      // 执行新增操作
      await categoryStore.addCategoryItemAction({
        ...formData,
        categoryId
      })
    }
    await refreshTable()
    ElMessage.success('执行成功')
  } catch (error: any) {
    ElMessage.error(error?.message || '操作失败')
  }
}

// 处理编辑
const handleEdit = (row: ICategory) => {
  modalRef.value?.setModalVisible(false, row)
}

// 处理删除
const handleDelete = async (row: ICategory) => {
  try {
    await categoryStore.deleteCategoryItemAction(row.id)
    await refreshTable()
    ElMessage.success('删除成功')
  } catch (error: any) {
    console.log(error)
    ElMessage.error(error?.message || '删除失败')
  }
}

// 选中的行数据
const selectedRows = ref<ICategory[]>([])

// 处理选择变化
const handleSelectionChange = (selection: ICategory[]) => {
  selectedRows.value = selection
}

// 监听路由参数变化，重新获取数据
watch(
  () => route.query.categoryId,
  async (newId) => {
    if (newId) {
      await refreshTable()
    }
  }
)
</script>

<template>
  <div class="sub-category-container">
    <!-- 操作按钮区域 -->
    <operation-cmp
      :operation-config="operationConfig"
      @handle-add="handleAdd"
    />

    <!-- 表格区域 -->
    <table-cmp
      ref="tableRef"
      :table-config="tableConfigRef"
      @edit="handleEdit"
      @delete="handleDelete"
      @selection-change="handleSelectionChange"
    />

    <!-- 弹窗组件 -->
    <modal-cmp
      ref="modalRef"
      :modal-config="modalConfigRef"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="less">
.sub-category-container {
  :deep(.el-table) {
    margin-top: 4px;
    border-radius: 8px;
    overflow: hidden;

    // 设置表头样式
    .el-table__header {
      th {
        background-color: #f8fafc;
        color: #475569;
        font-weight: 600;
      }
    }

    // 设置表格行样式
    .el-table__row {
      td {
        padding: 8px 0;
      }

      &:hover {
        td {
          background-color: #f8fafc;
        }
      }
    }
  }
}
</style>
