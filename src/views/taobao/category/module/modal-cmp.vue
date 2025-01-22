<script setup lang="ts">
/**
 * 2025/1/22 18:12
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 弹窗组件
 * @version 1.0
 * @since 1.0
 */
import { ref } from 'vue'

const dialogVisible = ref(false)

/**
 * 设置弹窗显示状态
 */
const setDialogVisible = (visible: boolean) => {
  dialogVisible.value = visible
}

defineExpose({
  setDialogVisible
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增类目"
    width="30%"
    :modal-append-to-body="true"
    :append-to-body="true"
    :lock-scroll="false"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-form label-width="80px">
      <el-form-item label="类目名称">
        <el-input v-model="name" placeholder="请输入类目名称" />
      </el-form-item>
      <el-form-item label="类目描述">
        <el-input
          v-model="description"
          type="textarea"
          placeholder="请输入类目描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .el-dialog__header {
    margin: 0;
    padding: 15px 20px;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(to right, #f8fafc, #f1f5f9);

    .el-dialog__title {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
    }
  }

  .el-dialog__body {
    padding: 20px;
  }

  .el-dialog__footer {
    padding: 10px 20px;
    border-top: 1px solid #e5e7eb;
    background-color: #f8fafc;
  }
}

// 遮罩层样式
:deep(.el-overlay) {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}
</style>
