<script setup lang="ts">
/**
 * 2025/1/19 0:37
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 类目管理
 * @version 1.0
 * @since 1.0
 */
import { OperationCmp } from '@/views/taobao/category/module'
import { computed, onMounted, ref } from 'vue'
import useCategoryStore from '@/stores/category/category.ts'
import modalConfig from '@/views/taobao/category/config/modal.config.ts'
import type ModalCmp from '@/components/page/page-modal/modal-cmp.vue'
import type TableCmp from '@/components/page/page-table/table-cmp.vue'
import tableConfig from '@/views/taobao/category/config/table.config.ts'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)

const tableRef = ref<InstanceType<typeof TableCmp>>()
const modalRef = ref<InstanceType<typeof ModalCmp>>()

onMounted(async () => {
  if (tableRef.value) {
    tableRef.value.loading = true
  }
  try {
    await categoryStore.getCategoryListAction()
  } finally {
    if (tableRef.value) {
      tableRef.value.loading = false
    }
  }
})

/**
 * 执行新增
 */
const handleAdd = () => {
  modalRef.value?.setModalVisible(true)
}

const modalConfigRef = computed(() => {
  // TODO 自定义配置内容
  return modalConfig
})

const tableConfigRef = computed(() => {
  return {
    ...tableConfig,
    tableData: categoryList.value
  }
})

const handleConfirm = async (formData: any) => {
  try {
    console.log('创建数据', formData)
  } catch (error) {
    ElMessage.error('创建失败')
  }
}
</script>

<template>
  <div class="category-container">
    <!-- 操作按钮区域 -->
    <operation-cmp @handle-add="handleAdd" />

    <!-- 表格区域 -->
    <table-cmp ref="tableRef" :table-config="tableConfigRef" />

    <!-- 弹窗组件 -->
    <modal-cmp
      ref="modalRef"
      :modal-config="modalConfigRef"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style scoped lang="less">
.category-container {
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

    // 修改筛选图标样式
    .el-table__column-filter-trigger {
      margin-left: 4px;

      .el-icon {
        font-size: 16px;
        color: #94a3b8;
        transition: all 0.3s ease;

        svg {
          transition: transform 0.3s ease;
        }
      }

      &:hover {
        .el-icon {
          color: var(--el-color-primary);

          svg {
            transform: scale(1.1);
          }
        }
      }
    }

    // 激活状态的筛选图标
    .is-filtered .el-table__column-filter-trigger {
      .el-icon {
        color: var(--el-color-primary);
      }
    }

    // 筛选面板样式
    .el-table-filter {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
      overflow: hidden;

      .el-table-filter__list {
        padding: 4px 0;
        min-width: 120px; // 设置最小宽度
      }

      .el-table-filter__list-item {
        padding: 8px 16px;
        color: #475569;
        font-size: 14px;
        transition: all 0.2s ease;

        &:hover {
          background-color: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
        }

        &.is-active {
          background-color: var(--el-color-primary);
          color: #ffffff;
        }
      }
    }

    // 自定义加载样式
    .el-loading-mask {
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(4px);

      .el-loading-spinner {
        .el-loading-text {
          color: var(--el-color-primary);
          font-size: 14px;
          margin-top: 8px;
        }

        .circular {
          width: 32px;
          height: 32px;
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
