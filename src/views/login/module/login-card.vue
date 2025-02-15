<script setup lang="ts">
import { ref } from 'vue'
import AccountCard from './account-card.vue'
import QrScanCard from '@/views/login/module/qr-scan-card.vue'
import { WX_SCAN } from '@/global/constant'

const activeTab = ref('account')
</script>

<template>
  <el-card class="content-card">
    <el-tabs v-model="activeTab" class="login-tabs">
      <el-tab-pane label="账号登录" name="account">
        <account-card />
      </el-tab-pane>

      <el-tab-pane label="微信登录" name="wx_scan">
        <qr-scan-card :active="activeTab === WX_SCAN" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped lang="less">
.content-card {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  :deep(.el-card__body) {
    padding: 20px;
  }

  .login-tabs {
    :deep(.el-tabs__nav-wrap::after) {
      height: 1px;
      background-color: #e2e8f0;
    }

    :deep(.el-tabs__item) {
      font-size: 14px;
      color: #64748b;
      height: 40px;
      line-height: 40px;

      &.is-active {
        color: #1d4ed8;
      }
    }
  }
}
</style>
