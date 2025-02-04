<script setup lang="ts">
/**
 * 2025/2/3 15:30
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 链接管理
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
import { useRoute } from 'vue-router'
import type { ICommodityLink } from '@/stores/commodity/i-commodity'
import useCommodityStore from '@/stores/commodity/commodity.ts'

const route = useRoute()
const commodityId = route.query.commodityId
const tableRef = ref<InstanceType<typeof TableCmp>>()
const modalRef = ref<InstanceType<typeof ModalCmp>>()
const commodityStore = useCommodityStore()

onMounted(() => {
  refreshTable()
})

const refreshTable = async () => {
  // 获取数据
  await commodityStore.getCommodityLinksAction(commodityId)
}

// 表格配置
const tableConfigRef = computed(() => {
  return {
    ...tableConfig,
    tableData: commodityStore.commodityLinkList
  }
})

const modalConfigRef = computed(() => {
  return modalConfig
})

/**
 * 执行新增
 */
const handleAdd = () => {
  modalRef.value?.setModalVisible(true)
  modalRef.value?.setSelectData(selectInit())
}

// 处理编辑
const handleEdit = (row: ICommodityLink) => {
  modalRef.value?.setModalVisible(false, row)
  modalRef.value?.setSelectData(selectInit())
}

const selectInit = () => {
  return [
    {
      label: 'Windows',
      value: 'WINDOWS'
    },
    {
      label: 'Mac',
      value: 'MAC'
    },
    {
      label: 'Linux',
      value: 'LINUX'
    }
  ]
}

// 处理删除
const handleDelete = async (row: ICommodityLink) => {
  try {
    await commodityStore.deleteCommodityLinksAction([row.id])
    await refreshTable()
    ElMessage.success('删除成功')
  } catch (e) {
    ElMessage.error('删除失败')
  }
}

// 处理选择变化
const handleSelectionChange = (selection: Record<string, any>[]) => {}

// 处理确认
const handleConfirm = async (formData: ICommodityLink) => {
  try {
    console.log(formData)
    if (formData.id) {
      await commodityStore.editCommodityLinkAction(formData)
    } else {
      await commodityStore.addCommodityLinkAction({
        ...formData,
        commodityId
      })
    }
    await refreshTable()
    ElMessage.success('操作成功')
  } catch (error) {
    ElMessage.error('操作失败')
  }
}
</script>

<template>
  <div class="link-container">
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
.link-container {
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
