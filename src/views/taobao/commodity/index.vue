<script setup lang="ts">
/**
 * 2025/2/2 15:30
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 商品管理
 * @version 1.0
 * @since 1.0
 */
import { computed, onMounted, ref } from 'vue'
import operationConfig from './config/operation.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'
import type ModalCmp from '@/components/page/page-modal/modal-cmp.vue'
import type TableCmp from '@/components/page/page-table/table-cmp.vue'
import type OperationCmp from '@/components/page/page-operation/operation-cmp.vue'
import { ElMessage } from 'element-plus'
import useCommodityStore from '@/stores/commodity/commodity.ts'
import useCategoryStore from '@/stores/category/category.ts'
import type { ICommodity } from '@/stores/commodity/i-commodity'

const tableRef = ref<InstanceType<typeof TableCmp>>()
const modalRef = ref<InstanceType<typeof ModalCmp>>()

const commodityStore = useCommodityStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  refreshTable()
})

/**
 * 刷新表格
 */
const refreshTable = async () => {
  await commodityStore.getCommodityAllInfoAction()
}

// 表格配置
const tableConfigRef = computed(() => {
  return {
    ...tableConfig,
    tableData: commodityStore.commodityList
  }
})

const modalConfigRef = computed(() => {
  return modalConfig
})

/**
 * 执行新增
 */
const handleAdd = async () => {
  modalRef.value?.setModalVisible(true)
  await selectDataInit()
}

// 处理编辑
const handleEdit = async (row: Record<string, any>) => {
  modalRef.value?.setModalVisible(false, row)
  await selectDataInit()
}

const selectDataInit = async () => {
  await categoryStore.getSelectItemsAction()
  modalRef.value?.setSelectData(categoryStore?.selectData)
}

// 处理删除
const handleDelete = async (row: ICommodity) => {
  try {
    await commodityStore.deleteCommodityAction(row?.commodityId)
    await refreshTable()
    ElMessage.success(`删除成功`)
  } catch (error) {
    ElMessage.error(`删除失败：${error}`)
  }
}

// TODO 处理选择变化
const handleSelectionChange = (selection: Record<string, any>[]) => {
}

// 处理确认
const handleConfirm = async (formData: ICommodity) => {
  try {
    if (formData.commodityId) {
      // 执行修改
      await commodityStore.editCommodityAction(formData)
    } else {
      // 执行新增
      await commodityStore.addCommodityAction(formData)
    }
    await refreshTable()
    ElMessage.success('操作成功')
  } catch (error) {
    ElMessage.error('操作失败')
  }
}
</script>

<template>
  <div class="commodity-container">
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
.commodity-container {
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
