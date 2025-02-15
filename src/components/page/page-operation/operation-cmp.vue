<script setup lang="ts">
/**
 * 2025/1/22 16:18
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 头部操作组件
 * @version 1.0
 * @since 1.0
 */
import { Delete, Plus, Search } from '@element-plus/icons-vue'
import { defineEmits, ref, watch } from 'vue'
import type { IOperationProps } from '@/components/page/page-operation/opreation'

const emit = defineEmits(['handleAdd', 'handleSearch'])

const props = defineProps<IOperationProps>()

const searchData = ref(props.operationConfig.searchDtl?.searchData)

// 处理批量删除
const handleBatchDelete = () => {
  // TODO: 实现批量删除逻辑
}

// 处理新增
const handleAdd = () => {
  // TODO: 实现新增逻辑
  emit('handleAdd')
}

watch(searchData, (newVal) => {
  emit('handleSearch', newVal)
})
</script>

<template>
  <div class="operation-area">
    <!-- TODO 搜索框 -->
    <el-input
      v-model="searchData"
      :placeholder="props.operationConfig.searchDtl?.placeholder"
      class="search-input"
      :prefix-icon="Search"
      clearable
    />

    <div class="operation-buttons">
      <el-button type="primary" :icon="Plus" @click="handleAdd">
        新增
      </el-button>
      <el-button type="danger" :icon="Delete" @click="handleBatchDelete">
        批量删除
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.operation-area {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;

  .search-input {
    width: 240px;

    :deep(.el-input__wrapper) {
      padding: 0 8px;
      height: 32px;
    }

    :deep(.el-input__inner) {
      font-size: 13px;
    }
  }

  .operation-buttons {
    display: flex;
    gap: 8px;

    .el-button {
      padding: 6px 12px;
      height: 32px;
      font-size: 13px;
    }
  }
}
</style>
